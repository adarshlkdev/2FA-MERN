import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateVerificationToken,
  generateTokenAndSetCookie,
} from "../utils/helpers.js";
import {
  generateResetPasswordEmailTemplate,
  generateResetPasswordSuccessEmailTemplate,
  generateWelcomeEmailTemplate,
  verificationEmailTemplate,
} from "../utils/emailTemplate.js";
import transporter from "../config/email.config.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateVerificationToken();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    const verificationEmail = verificationEmailTemplate(
      process.env.APP_NAME,
      name,
      verificationToken
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `${process.env.APP_NAME} - Verify your email address`,
      html: verificationEmail,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log("Error in signup controller", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    const welcomeEmail = generateWelcomeEmailTemplate(
      process.env.APP_NAME,
      user.name
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Welcome to ${process.env.APP_NAME}`,
      html: welcomeEmail,
    });
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in verifyEmail controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not exists with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not exists with this email" });
    }
    //Generate reset password token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    const resetEmail = generateResetPasswordEmailTemplate(
      process.env.APP_NAME,
      user.name,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reset your password for ${process.env.APP_NAME}`,
      html: resetEmail,
    });
    res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset password link",
      });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    const resetPassswordSuccessEmail =
      generateResetPasswordSuccessEmailTemplate(
        process.env.APP_NAME,
        user.name
      );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Password reset successfully for ${process.env.APP_NAME}`,
      html: resetPassswordSuccessEmail,
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
