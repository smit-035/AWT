// app.js

const eventManager = require("./eventManager");
require("./events/userEvents");

// Emit events dynamically
eventManager.emit("user-login", { username: "Smit" });
eventManager.emit("user-login", { username: "Rahul" });

eventManager.emit("user-purchase", {
  username: "Smit",
  item: "Laptop",
});

eventManager.emit("profile-update", { username: "Rahul" });

eventManager.emit("user-logout", { username: "Smit" });

// Trigger summary
eventManager.emit("summary");
