const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());  // allow all origins for now

// File persistence
const USERS_FILE = path.join(__dirname, "users.json");

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

let users = loadUsers();

// -------- SIGNUP --------
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return res.status(400).json({ error: "Account already exists" });

  users.push({ email, password });
  saveUsers(users);

  console.log("New user added:", email);
  res.json({ message: "Signup successful" });
});

// -------- LOGIN --------
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email: user.email }, "secretkey", { expiresIn: "1h" });
  res.json({ token });
});

// -------- CHECKOUT --------
app.post("/checkout", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(auth.split(" ")[1], "secretkey");
    res.json({ message: "Proceed to payment success", user: decoded });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
