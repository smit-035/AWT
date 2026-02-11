// events/userEvents.js

const eventManager = require("../eventManager");
const eventStore = require("../eventStore");

// LOGIN
eventManager.on("user-login", (data) => {
  console.log(`✅ Login: ${data.username}`);
});

// LOGOUT
eventManager.on("user-logout", (data) => {
  console.log(`🚪 Logout: ${data.username}`);
});

// PURCHASE
eventManager.on("user-purchase", (data) => {
  console.log(`🛒 Purchase: ${data.username} bought ${data.item}`);
});

// PROFILE UPDATE
eventManager.on("profile-update", (data) => {
  console.log(`✏️ Profile updated: ${data.username}`);
});

// SUMMARY EVENT
eventManager.on("summary", () => {
  console.log("\n📊 EVENT SUMMARY REPORT");
  console.log("------------------------");

  const summary = eventStore.getSummary();

  Object.entries(summary).forEach(([event, count]) => {
    console.log(`${event} → ${count} times`);
  });

  console.log("------------------------\n");
});
