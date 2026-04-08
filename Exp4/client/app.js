const API_BASE = "http://localhost:5000";

const screens = {
  login: document.getElementById("screen-login"),
  userDetails: document.getElementById("screen-user-details"),
  userDashboard: document.getElementById("screen-user-dashboard"),
  adminDashboard: document.getElementById("screen-admin-dashboard"),
};

// --- Helper: Switch Screens ---
function showScreen(screenName) {
  Object.values(screens).forEach((el) => {
    el.classList.add("hidden");
    el.style.opacity = "0";
  });

  const target = screens[screenName];
  if (target) {
    target.classList.remove("hidden");
    // Small delay to allow 'display: block' to register before animating opacity
    setTimeout(() => { target.style.opacity = "1"; }, 50);
  }
}

// --- Login Logic ---
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      if (data.role === "admin") {
        showScreen("adminDashboard");
        // Optional: Call a function here to load all users into the admin table
      } else {
        document.getElementById("details-username").textContent = data.username;
        showScreen("userDetails");
      }
    } else {
      document.getElementById("login-message").textContent = result.message || "Login Failed";
    }
  } catch (err) {
    console.error("Auth Error:", err);
    document.getElementById("login-message").textContent = "Server connection failed.";
  }
});

// --- User Details Logic ---
const detailsForm = document.getElementById("details-form");
detailsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(detailsForm);
  const data = Object.fromEntries(formData.entries());
  
  // Update Dashboard UI with these details
  document.getElementById("dash-username").textContent = document.getElementById("details-username").textContent;
  document.getElementById("dash-name").textContent = data.name;
  document.getElementById("dash-location").textContent = data.location;
  document.getElementById("dash-login-time").textContent = new Date().toLocaleTimeString();

  showScreen("userDashboard");
});

// --- Logout Logic ---
document.getElementById("logout-user").addEventListener("click", () => location.reload());
document.getElementById("logout-admin").addEventListener("click", () => location.reload());