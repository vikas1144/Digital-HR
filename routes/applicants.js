const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ Create transporter (Gmail requires App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Helper function to send email
async function sendEmail({ from, to, subject, text }) {
  return transporter.sendMail({ from, to, subject, text });
}

// ✅ POST /api/applicants/approve
router.post("/approve", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Email to applicant
    await sendEmail({
      from: `"Digital HR" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 You're Hired!",
      text: `Hi ${name},\n\nCongratulations! You've been selected for the job. Our team will contact you soon.\n\nRegards,\nDigital HR Team`,
    });

    // Notify admin
    await sendEmail({
      from: `"Digital HR" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "✅ Applicant Approved",
      text: `You have approved the applicant: ${name} (${email}).`,
    });

    res.status(200).json({ message: "Approval emails sent successfully!" });
  } catch (error) {
    console.error("Error sending approval emails:", error);
    res.status(500).json({ error: "Email sending failed." });
  }
});

// ✅ POST /api/applicants/reject
router.post("/reject", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Email to applicant
    await sendEmail({
      from: `"Digital HR" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "📩 Application Update",
      text: `Hi ${name},\n\nThank you for applying. Unfortunately, you were not selected. Please try again in the future.\n\nRegards,\nDigital HR Team`,
    });

    // Notify admin
    await sendEmail({
      from: `"Digital HR" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "❌ Applicant Rejected",
      text: `You have rejected the applicant: ${name} (${email}).`,
    });

    res.status(200).json({ message: "Rejection emails sent successfully!" });
  } catch (error) {
    console.error("Error sending rejection emails:", error);
    res.status(500).json({ error: "Email sending failed." });
  }
});

module.exports = router;
