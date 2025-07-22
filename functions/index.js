const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");
const admin       = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Bind both your secrets *and* the correct document pattern:
exports.sendConfirmationEmailGen2 = onDocumentCreated(
  {
    document: "submissions/{submissionId}",   // ← must be `document`
    secrets: ["EMAIL_EMAIL", "EMAIL_PASSWORD"]
  },
  async (event) => {
    // event.data is now a valid Firestore DocumentSnapshot
    const snap = event.data;
    if (!snap) {
      console.log("No data associated with the event.");
      return null;
    }

    const submission = snap.data();
    const userEmail  = submission.email;
    if (!userEmail) {
      console.log("No email address provided for this submission.");
      return null;
    }

    const emailUser     = process.env.EMAIL_EMAIL;
    const emailPassword = process.env.EMAIL_PASSWORD;
    console.log("Secrets loaded:", emailUser, typeof emailUser);

    if (!emailUser || !emailPassword) {
      console.error(
        "Missing secrets. Did you run:\n" +
        "  firebase functions:secrets:set EMAIL_EMAIL=<email>\n" +
        "  firebase functions:secrets:set EMAIL_PASSWORD=<pass>\n" +
        "and then redeploy?"
      );
      return null;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from:    "Siaga Capsule Team <siagacapsule@gmail.com>",
      to:      userEmail,
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
      console.log("Confirmation email (Gen 2) sent to:", userEmail);
    } catch (err) {
      console.error("Error sending email:", err);
    }

    return null;
  }
);
