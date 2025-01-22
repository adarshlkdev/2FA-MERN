export const verificationEmailTemplate = (appName, fullName, otp) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #4F46E5, #6D63FF);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            padding: 30px 20px;
            color: #333;
        }
        .content h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #4F46E5;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
        }
        .otp {
            font-size: 36px;
            font-weight: bold;
            color: #4F46E5;
            text-align: center;
            letter-spacing: 6px;
            padding: 20px;
            background: #f4f4f9;
            border-radius: 8px;
            margin: 30px 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .expire-text {
            color: #666;
            text-align: center;
            font-size: 14px;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
            background: #f8f8f8;
            border-top: 1px solid #eee;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${appName}</h1>
        </div>
        <div class="content">
            <h2>Verification Code</h2>
            <p>Hello ${fullName},</p>
            <p>Please use the following OTP to verify your account:</p>
            <div class="otp">${otp}</div>
            <p>If you didn't request this code, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const generateWelcomeEmailTemplate = (appName, name) => `
 <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f9;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #4F46E5, #6D63FF);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .content {
                    padding: 30px 20px;
                    color: #333;
                }
                .content h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #4F46E5;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 10px 0;
                }
                .features {
                    margin-top: 20px;
                }
                .features ul {
                    list-style: none;
                    padding: 0;
                }
                .features ul li {
                    background: #f8f8f8;
                    padding: 10px;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                }
                .features ul li::before {
                    content: "✔️";
                    margin-right: 10px;
                    color: #4F46E5;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #666;
                    background: #f8f8f8;
                    border-top: 1px solid #eee;
                }
                .footer p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome ${name} to ${appName}! 🎉</h1>
                </div>
                <div class="content">
                    <h2>Hello,</h2>
                    <p>Thank you for verifying your email address. Your account is now fully activated, and you can start exploring all the amazing features of ${appName}.</p>    
                    <p>We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    <p>Happy exploring! 🚀</p>
                </div>
                <div class="footer">
                    <p>This is an automated message, please do not reply.</p>
                    <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </div>
            </div>
        </body>
        </html>
`;

export const generateResetPasswordEmailTemplate = (
  appName,
  name,
  resetLink
) => `
 <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f9;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #4F46E5, #6D63FF);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .content {
                    padding: 30px 20px;
                    color: #333;
                }
                .content h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #4F46E5;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 10px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #666;
                    background: #f8f8f8;
                    border-top: 1px solid #eee;
                }
                .footer p {
                    margin: 5px 0;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #4F46E5;
                    border-radius: 5px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <h2>Hello ${name},</h2>
                    <p>We received a request to reset your password for your ${appName} account. Click the button below to reset your password:</p>
                    <a href="${resetLink}" class="button">Reset Password</a>
                    <p>This link will expires in 1 hour for security reasons.</p>
                    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                    <p>Thank you,</p>
                    <p>The ${appName} Team</p>
                </div>
                <div class="footer">
                    <p>This is an automated message, please do not reply.</p>
                    <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
`;

export const generateResetPasswordSuccessEmailTemplate = (appName, name) => `
 <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f9;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #4F46E5, #6D63FF);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }
                .content {
                    padding: 30px 20px;
                    color: #333;
                }
                .content h2 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #4F46E5;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 10px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #666;
                    background: #f8f8f8;
                    border-top: 1px solid #eee;
                }
                .footer p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Successful</h1>
                </div>
                <div class="content">
                    <h2>Hello ${name},</h2>
                    <p>Your password for your ${appName} account has been successfully reset. You can now log in with your new password.</p>
                    <p>If you did not perform this action, please contact our support team immediately.</p>
                    <p>Thank you,</p>
                    <p>The ${appName} Team</p>
                </div>
                <div class="footer">
                    <p>This is an automated message, please do not reply.</p>
                    <p>&copy; ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
`;
