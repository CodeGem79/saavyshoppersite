const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Your Firebase configuration for the Cloud Function
admin.initializeApp();

// Configure the email transport using the default SMTP transport and a Gmail account.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user, // Set these in Firebase config
    pass: functions.config().email.pass, // Set these in Firebase config
  },
});

exports.sendSubmissionEmail = functions.firestore
  .document('submissions/{docId}')
  .onCreate(async (snap, context) => {
    const newSubmission = snap.data();
    const docId = context.params.docId;

    const mailOptions = {
      from: 'SaavyShopper Admin <no-reply@saavyshopper.com>',
      to: 'nkyi.amanda@gmail.com', // **CHANGE THIS TO YOUR EMAIL ADDRESS**
      subject: `New Article Submission from ${newSubmission.authorName}`,
      html: `
        <h2>New Article Submitted!</h2>
        <p>A new article has been submitted to your blog and is awaiting review.</p>
        <hr/>
        <h3>Article Details:</h3>
        <p><strong>Title:</strong> ${newSubmission.title}</p>
        <p><strong>Category:</strong> ${newSubmission.category}</p>
        <p><strong>Author:</strong> ${newSubmission.authorName} (${newSubmission.authorEmail})</p>
        <p><strong>Summary:</strong> ${newSubmission.summary}</p>
        <p><strong>Website:</strong> ${newSubmission.authorWebsite || 'N/A'}</p>
        <hr/>
        <p>Please log in to the CMS to review the full article content.</p>
        <p><strong>Document ID:</strong> ${docId}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('New submission email sent successfully.');
    } catch (error) {
      console.error('There was an error sending the email:', error);
    }

    return null;
  });
