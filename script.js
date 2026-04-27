// Firebase Config (Replace this)
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database().ref("messages");

// Send Message
function sendMessage() {
  let username = document.getElementById("username").value;
  let message = document.getElementById("message").value;

  if (username === "" || message === "") {
    alert("Enter name and message");
    return;
  }

  db.push({
    name: username,
    text: message
  });

  document.getElementById("message").value = "";
}

// Receive Messages (Real-time)
db.on("child_added", function(snapshot) {
  let data = snapshot.val();

  let chatBox = document.getElementById("chat-box");
  let msg = document.createElement("div");

  msg.classList.add("message");
  msg.innerHTML = `<strong>${data.name}:</strong> ${data.text}`;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});