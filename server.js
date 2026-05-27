const express = require("express");
const app = express();

// app.get("/health", (req, res) => {
//   res.json({ ok: true, status: "up" });
// });

// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });

app.use(express.json());
app.use(express.text({ type: "text/plain" }));

app.get("/health", (req, res) => {
  res.json({ ok: true, status: "up" });
});

app.post("/test", (req, res) => {
  res.json({
    contentType: req.headers["content-type"],
    bodyType: typeof req.body,
    body: req.body,
  });
});

app.listen(3000, () => {
  console.log("Express server running at http://localhost:3000");
});
