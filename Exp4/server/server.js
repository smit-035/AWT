const express = require("express");
const cors    = require("cors");
const path    = require("path");

const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS — allows React (port 3000) to talk to Express (port 5000)
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}));

app.use(express.json());

// Routes
app.use("/", authRoutes);

// ✅ Test route
app.get("/ping", (req, res) => {
    res.json({ message: "✅ Backend is running!" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));