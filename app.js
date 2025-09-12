import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Subscription Tracker API is running");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
