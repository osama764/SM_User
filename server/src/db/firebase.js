const firebase = require("firebase/app");
require("firebase/database");

// const firebaseConfig = {
//   apiKey: "AIzaSyC3df-jBzrAVkEWD4veB5OZhrYCTfdfKmk",
//   authDomain: "zabir-test.firebaseapp.com",
//   databaseURL: "https://zabir-test-default-rtdb.firebaseio.com",
//   projectId: "zabir-test",
//   storageBucket: "zabir-test.appspot.com",
//   messagingSenderId: "471433547411",
//   appId: "1:471433547411:web:952a1ee0047dfc0e75c766",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAAUwKpK6j5fy3gTzMwamS5QHTJ7xSic0c",
  authDomain: "smart-test-ee901.firebaseapp.com",
  databaseURL: "https://smart-test-ee901-default-rtdb.firebaseio.com",
  projectId: "smart-test-ee901",
  storageBucket: "smart-test-ee901.appspot.com",
  messagingSenderId: "608199887325",
  appId: "1:608199887325:web:1830f4c5d50e2ce9c6ce34"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

module.exports = {
  firebase,
  db: database,
};
