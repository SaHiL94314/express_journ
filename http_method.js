const express = require("express");
const app = express();
app.listen(3000);

app.use(express.json());

let users = {};
//get request
app.get("/user", (req, res) => {
    res.send(users);
});

//post method
app.post("/user", (req, res) => {
  users = req.body;
  res.json({
    "message": "data received successfully",
    "user": req.body
  });
});

//patch method
app.patch("/user", (req, res) => {
  for (key in req.body) {
    users[key] = req.body[key];
  }
  res.json({
    message: "data updated successfully"
  });
});

//delete method
app.delete("/user", (req, res) => {
  users = {};
  res.json({
    message: "data deleted successfully"
  });
});
