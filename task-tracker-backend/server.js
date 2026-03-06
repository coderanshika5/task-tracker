// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// let users = [];

// app.post("/api/register", (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   users.push({ name, email, password });

//   res.json({ message: "User registered successfully" });
// });

// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find(
//     (u) => u.email === email && u.password === password
//   );

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   res.json({
//     token: "dummy-jwt-token",
//     user
//   });
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let tasks = [];


// REGISTER
app.post("/api/register", (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  users.push({ name, email, password });

  res.json({ message: "User registered successfully" });

});


// LOGIN
app.post("/api/login", (req, res) => {

  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: "dummy-jwt-token",
    user
  });

});


// GET TASKS
app.get("/api/tasks", (req, res) => {

  res.json(tasks);

});


// CREATE TASK
app.post("/api/tasks", (req, res) => {

  const { title, description, status } = req.body;

  const task = {
    id: Date.now(),
    title,
    description,
    status
  };

  tasks.push(task);

  res.json(task);

});


// DELETE TASK
app.delete("/api/tasks/:id", (req, res) => {

  const id = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({ message: "Task deleted" });

});


// UPDATE TASK
app.put("/api/tasks/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title;
  task.description = req.body.description;
  task.status = req.body.status;

  res.json(task);

});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});