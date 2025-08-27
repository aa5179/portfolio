const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "aroraaditya358@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #ff4500;">New Contact Form Message</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #ff4500;">
            <h3>Message:</h3>
            <p style="line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background: #333; color: white; text-align: center; border-radius: 4px;">
            <p>Message sent from your mystical portfolio ✨</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`🔮 Mystical backend server running on port ${PORT}`);
});
