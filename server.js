const express = require("express");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// Temporary users data
const users = [
  {
    id: 1,
    name: "Sheela",
    email: "sheela@gmail.com"
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com"
  }
];

// ========================
// GET ALL USERS
// ========================

app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});

// ========================
// GET USER BY ID
// ========================

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// ========================
// CREATE USER
// ========================

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
});

// ========================
// DELETE USER
// ========================

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    users.splice(userIndex, 1);
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});

// =======================
//UPDATE USER
// =======================

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body; 
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  if (!name || !email) {
  return res.status(400).json({
    success: false,
    message: "Name and email are required"
  });
}

  users[userIndex] = { ...users[userIndex], name, email };

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: users[userIndex]
  });
});


// ========================
// ERROR HANDLING
// ========================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
}); 

// ========================
// START SERVER
// ========================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});