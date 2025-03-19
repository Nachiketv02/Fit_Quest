const userModel = require("../model/user.model");
const blackListTokenModel = require("../model/blackListToken.model");
const userService = require("../service/user.service");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../utils/sendEmail");
const { sendToken } = require("../utils/sendToken");
const crypto = require("crypto");

module.exports.signupUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, phone, gender, password } = req.body;
    if (!fullName || !email || !phone || !gender || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.signupUser({
      fullName,
      email,
      phone,
      gender,
      password: hashedPassword,
    });

    const verificationCode = await user.generateVerificationCode();
    await userModel.findByIdAndUpdate(user._id, { verificationCode });

    sendVerificationEmail(verificationCode, user, res);
  } catch (error) {
    if (error.response) {
      console.log("Error Data:", error.response.data);
      console.log("Error Status:", error.response.status);
    } else {
      console.log("Error:", error.message);
    }
  }
};

function generateEmailVerificationLink(verificationCode, fullName) {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Verification Code</title>
      <style>
        /* Base styles */
        body {
          margin: 0;
          padding: 0;
          background-color: #121212;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #e0e0e0;
          -webkit-font-smoothing: antialiased;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .email-wrapper {
          background-color: #1e1e1e;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
        }
        
        .header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          padding: 30px 20px;
          text-align: center;
        }
        
        .logo {
          width: 120px;
          height: 40px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          letter-spacing: 1px;
        }
        
        .content {
          padding: 30px 40px;
        }
        
        h1 {
          color: white;
          font-size: 24px;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 20px;
        }
        
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #b0b0b0;
          margin-bottom: 24px;
        }
        
        .otp-container {
          background-color: #252525;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
          border: 1px solid #333;
        }
        
        .otp-code {
          font-family: 'Courier New', monospace;
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #ffffff;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
          padding: 10px 20px;
        }
        
        .expiry {
          font-size: 14px;
          color: #888;
          margin-top: 16px;
        }
        
        .footer {
          background-color: #171717;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        
        .social-links {
          margin-top: 20px;
          margin-bottom: 20px;
        }
        
        .social-link {
          display: inline-block;
          width: 32px;
          height: 32px;
          background-color: #333;
          border-radius: 50%;
          margin: 0 8px;
        }
        
        .help-text {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #333;
          font-size: 14px;
          color: #888;
        }
        
        @media only screen and (max-width: 480px) {
          .content {
            padding: 20px;
          }
          
          .otp-container {
            padding: 20px 10px;
          }
          
          .otp-code {
            font-size: 28px;
            letter-spacing: 6px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="content">
            <h1>Verification Code</h1>
            <p>Hello ${fullName},</p>
            <p>We received a request to verify your account. Please use the verification code below to complete the process:</p>
            
            <div class="otp-container">
              <div class="otp-code">${verificationCode}</div>
              <div class="expiry">This code will expire in 5 minutes</div>
            </div>
            
            <p>If you didn't request this code, you can safely ignore this email. Someone might have typed your email address by mistake.</p>
            
            <div class="help-text">
              <p>Need help? Contact our support team at <a href="mailto:support@fitquest.com" style="color: #4f46e5;">support@fitquest.com</a></p>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 Fit Quest. All rights reserved.</p>
            <p>24-458, The Grand Plaza, VIP Road, Vesu, Surat, Gujarat 395007</p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
}

async function sendVerificationEmail(verificationCode, user, res) {
  try {
    const message = generateEmailVerificationLink(
      verificationCode,
      user.fullName
    );
    sendEmail({ email: user.email, subject: "Verification Code", message });
    res.status(200).json({
      message: `Verification mail sent to ${user.fullName}`,
      user: user.email,
    });
  } catch (error) {
    console.log("Error sending verification email:", error.message);
  }
}

module.exports.verifyUser = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userModel
      .findOne({ email: email, isVerified: false })
      .sort({ createdAt: -1 });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ error: "Verification code expired" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    return sendToken(user, 200, "User verified successfully", res);
  } catch (error) {
    console.log("Error in verifyUser Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await userModel.findOne({ email: email, isVerified: false });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const newVerificationCode = await user.generateVerificationCode();
    user.verificationCode = newVerificationCode;
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 min from now
    user.verificationCodeExpires = expirationTime;
    await user.save();
    const message = generateEmailVerificationLink(
      newVerificationCode,
      user.fullName
    );
    sendEmail({ email: user.email, subject: "Verification Code", message });
    res.status(200).json({
      message: `Verification mail sent to ${user.fullName}`,
      user: user.email,
    });
  } catch (error) {
    console.log("Error in resendVerificationCode Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userModel.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(400).json({ error: "User not found. Please verify your account or register your account." });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    return sendToken(user, 200, "Login successful", res);
  } catch (error) {
    console.log("Error in loginUser Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passwordResetToken = await user.generateResetPasswordToken();
    await user.save({ validateModifiedOnly: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`;

    const message = `Click on the following link to reset your password: ${resetUrl}`;

    await sendEmail({ email: user.email, subject: "Password Reset", message });

    return res
      .status(200)
      .json({ message: "Password reset token sent to your email" });
  } catch (error) {
    console.log("Error in forgotPassword Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }
    const resetPassword = await userModel.hashPassword(req.body.password);
    user.password = resetPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();
    return sendToken(user, 200, "Password reset successful", res);
  } catch (error) {
    console.log("Error in resetPassword Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in getUserProfile Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const blackListToken = await blackListTokenModel.findOne({ token });
    if (blackListToken) {
      return res
        .status(401)
        .json({ error: "blackListToken find you are Unauthorized" });
    }
    await blackListTokenModel.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logoutUser Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const calculateEndDate = (startDate, billingCycle) => {
  const endDate = new Date(startDate);
  if (billingCycle === "monthly") {
    endDate.setMonth(endDate.getMonth() + 1); // Add 1 month
  } else if (billingCycle === "annual") {
    endDate.setFullYear(endDate.getFullYear() + 1); // Add 1 year
  }
  return endDate;
};

module.exports.updateSubscription = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { plan, billingCycle } = req.body;

  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.subscriptionStatus === 'active') {
      const planHierarchy = {
        basic: 1,
        'basic-annual': 2,
        premium: 3,
        'premium-annual': 4,
        elite: 5,
        'elite-annual': 6
      };
      const currentPlanLevel = planHierarchy[user.subscription.toLowerCase()];
      const newPlanLevel = planHierarchy[plan.toLowerCase()];
      if (newPlanLevel <= currentPlanLevel) {
        return res.status(400).json({ message: `You cannot downgrade from ${user.subscription} to ${plan}.` });
      }
    }

    user.isSubscribed = true;
    user.subscription = plan;
    user.subscriptionStatus = "active";
    user.subscriptionStartDate = new Date();
    user.subscriptionEndDate = calculateEndDate(new Date(), billingCycle);
    user.billingCycle = billingCycle;

    await user.save();

    return res.status(200).json({
      message: "Subscription successful",
      subscription: {
        isSubscribed: user.isSubscribed,
        plan: user.subscription,
        status: user.subscriptionStatus,
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate,
        billingCycle: user.billingCycle,
      },
    });
  } catch (error) {
    console.error("Error subscribing user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};