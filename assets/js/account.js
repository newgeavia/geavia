// Firebase Config (tumhara project ka config)
var firebaseConfig = {
  apiKey: "AIzaSyAYA_MZZKF0eZthWoCobuiIWamBj3v6Ty0",
  authDomain: "geavia-a029b.firebaseapp.com",
  projectId: "geavia-a029b",
  storageBucket: "geavia-a029b.firebasestorage.app",
  messagingSenderId: "291148980381",
  appId: "1:291148980381:web:5131bb7c5b91b168897474",
  measurementId: "G-X4KCGD6C22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let confirmationResult;

// Recaptcha setup
window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: "invisible"
  });
};

// Send OTP
function sendOTP() {
  const phoneInput = document.getElementById("phone").value.trim();
  if (!phoneInput) return alert("Please enter phone number");

  let phoneNumber = phoneInput.replace(/\D/g, "");
  if (!phoneInput.startsWith("+")) phoneNumber = "+91" + phoneNumber;

  firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      document.getElementById("otp-section").style.display = "block";
      alert("OTP sent to " + phoneNumber);
    })
    .catch((error) => {
      alert(error.message);
      window.recaptchaVerifier.render().then(function(widgetId) {
        grecaptcha.reset(widgetId);
      });
    });
}

// Verify OTP
function verifyOTP() {
  const code = document.getElementById("otp").value.trim();
  if (!code) return alert("Enter OTP");

  confirmationResult.confirm(code)
    .then((result) => {
      alert("Login Successful 🎉");
      window.location.href = "index.html";
    })
    .catch(() => {
      alert("Invalid OTP ❌");
    });
}
