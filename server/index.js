const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { router } = require("./routes");

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
