const express = require("express");
const app = express();
const connectDB = require("./utils/db");
const santaRoutes = require("./routes/santaRoutes.js");
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use("/santa", santaRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


