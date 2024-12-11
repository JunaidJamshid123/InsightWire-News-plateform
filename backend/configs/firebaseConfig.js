const admin = require("firebase-admin");

// Load Firebase service account key
const serviceAccount = require("./serviceAccountKey.json"); // Update with the correct path to your service account key file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Use applicationDefault() if deploying on Google Cloud
  databaseURL: "https://insightwire-f8b50-default-rtdb.firebaseio.com", // Replace with your Firebase Realtime Database URL
});

module.exports = admin;
