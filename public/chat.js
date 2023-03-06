// make connection
let newUserPass = prompt(
  "App locked, Please input App Password."
).toLowerCase();
if (
  newUserPass == "admin" ||
  newUserPass == "supervisor" ||
  newUserPass == "user" ||
  newUserPass == "superadmin"
) {
  alert("Welcome");
  socket = io.connect("https://chatapp-blw4.onrender.com");
} else {
  alert("Wrong Password");
  const chat = document.getElementById("ugochidev");
  chat.innerHTML =
    "<p><strong>Please get a valid password and reload.</strong></p>";
  chat.style.background = "#e0b0b0";
}

// Query DOM
const message = document.getElementById("message");
userName = document.getElementById("userName");
btn = document.getElementById("send");
output = document.getElementById("output");
feedback = document.getElementById("feedback");
//   Emit events
btn.addEventListener("click", function () {
  if (userName.value == null || userName.value == "") {
    alert("Pls input a user name");
    return null;
  }
  if (message.value == null || message.value == "") {
    alert("Cannot send blank message!");
    return null;
  }
  socket.emit("chat", {
    message: message.value,
    userName: userName.value,
  });
  message.value = "";
});
message.addEventListener("keypress", function () {
  socket.emit("typing", userName.value);
});
// listen for events
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.userName + ":</strong>" + data.message + "</p>";
});
socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message ...</em></p>";
});
