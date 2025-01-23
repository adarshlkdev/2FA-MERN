import React from "react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, error, isLoading, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully , Redirecting to Login Page");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <p className="text-gray-300 mb-6 text-center">
            Enter your new password.
          </p>
          <div className="relative text-white">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 bg-opacity-50 text-white rounded-lg py-2 px-4 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          <div className="relative text-white">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 bg-opacity-50 text-white rounded-lg py-2 px-4 border border-gray-700 focus:outline-none focus:border-blue-500 mt-4"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          {message && (
            <p className="text-green-500 font-semibold mt-2">{message}</p>
          )}
          <button
            className="w-full bg-blue-500 text-white rounded-lg py-2 mt-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 font-bold animate-spin text-center mx-auto" />
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
