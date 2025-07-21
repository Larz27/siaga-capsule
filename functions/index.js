const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp();

// Add these logs temporarily for debugging
console.log("Attempting to create transporter with credentials:");
console.log("  EMAIL_USER:", process.env.EMAIL_USER);
console.log("  EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD); // Log actual password TEMPORARILY

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendConfirmationEmailGen2 = onDocumentCreated("submissions/{submissionId}", async (event) => {
  const snap = event.data;
  if (!snap) {
    console.log("No data associated with the event");
    return null;
  }

  const submission = snap.data();
  const userEmail = submission.email;

  if (!userEmail) {
    console.log("No email address provided for this submission.");
    return null;
  }

  const mailOptions = {
    from: "Siaga Capsule Team <siagacapsule@gmail.com>",
    to: userEmail,
    subject: "Your Hope for the Future Has Been Safely Stored!",
    text: `Hello,

Thank you for contributing to 🌌 Siaga Capsule — Digital Reflections for HBK20! Your hopes and dreams have been safely stored and will be delivered back to you on January 1, 2035, along with a personalized digital certificate of participation.

Once again, thank you for sharing your story. We look forward to rediscovering these reflections together in 2035.

Warm regards,
The Siaga Capsule Team
siagacapsule@gmail.com
https://siaga-capsule.netlify.app`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email (Gen 2) sent to:", userEmail);
    return null;
  } catch (error) {
    console.error("Error sending confirmation email (Gen 2):", error);
    return null;
  }
});
