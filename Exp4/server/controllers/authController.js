const fs   = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../login.json");

// ── Helpers ─────────────────────────────────────────────────────────────────
function readData() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify({ users: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
}

function writeData(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// ── POST /login ──────────────────────────────────────────────────────────────
async function login(req, res) {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // ── Admin login ──
        if (role === "admin") {
            if (username === "admin" && password === "1234") {
                return res.json({ success: true, role: "admin", redirect: "/admin-dashboard" });
            }
            return res.status(401).json({ success: false, message: "Invalid admin credentials." });
        }

        // ── User login ──
        const data = readData();
        const existingUser = data.users.find(
            (u) => u.username === username && u.password === password
        );

        if (existingUser) {
            // Returning user — login success
            return res.json({ success: true, role: "user", username, redirect: "/user-details" });
        }

        // New user — register them on first login
        const usernameExists = data.users.find((u) => u.username === username);
        if (usernameExists) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        // Register new user
        data.users.push({
            username,
            password,
            name: "",
            location: "",
            loginTime: "",
        });
        writeData(data);

        return res.json({ success: true, role: "user", username, redirect: "/user-details" });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ success: false, message: "Server error." });
    }
}

// ── POST /user-details ───────────────────────────────────────────────────────
async function saveUserDetails(req, res) {
    try {
        const { username, name, location } = req.body;

        if (!username || !name || !location) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const data      = readData();
        const userIndex = data.users.findIndex((u) => u.username === username);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const loginTime = new Date().toISOString();
        data.users[userIndex].name      = name;
        data.users[userIndex].location  = location;
        data.users[userIndex].loginTime = loginTime;

        writeData(data);

        res.json({ success: true, user: data.users[userIndex] });
    } catch (err) {
        console.error("User-details error:", err.message);
        res.status(500).json({ success: false, message: "Server error." });
    }
}

// ── GET /admin/users ─────────────────────────────────────────────────────────
async function getUsers(req, res) {
    try {
        const data = readData();
        // Return only non-sensitive fields for the admin table
        const users = data.users.map(({ username, name, location, loginTime }) => ({
            username,
            name,
            location,
            loginTime,
        }));
        res.json(users);
    } catch (err) {
        console.error("Admin/users error:", err.message);
        res.status(500).json({ success: false, message: "Server error." });
    }
}

module.exports = { login, saveUserDetails, getUsers };
