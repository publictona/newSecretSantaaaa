const express = require("express");
const { assignSecretSanta } = require("../utils/santaAssigner");
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const assignments = await assignSecretSanta();
    console.log("assignments",assignments);
    res.status(200).json({ message: "Secret Santa assignments generated!", assignments });
  } catch (error) {
    console.error("eeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrr",error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
