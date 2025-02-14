const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./utils/db");
const dbFilePath = path.join(__dirname, "db.json");
const santaRoutes = require("./routes/santaRoutes.js");
const Assignment = require("./routes/assignments");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use("/santa", santaRoutes);
app.use("/assignment", Assignment);

//connectDB();
//dbFilePath();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


