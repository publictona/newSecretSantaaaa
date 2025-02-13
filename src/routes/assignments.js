const express = require("express");
const generateCSV = require("../utils/csvWriter");

const router = express.Router();

router.get("/download-assignments", async (req, res) => {
  try {
    // Mock data (Replace with actual DB query)
    const assignments = [
      {
        Employee_Name: "John Doe",
        Employee_EmailID: "john@example.com",
        Secret_Child_Name: "Jane Smith",
        Secret_Child_EmailID: "jane@example.com",
      },
      {
        Employee_Name: "Jane Smith",
        Employee_EmailID: "jane@example.com",
        Secret_Child_Name: "John Doe",
        Secret_Child_EmailID: "john@example.com",
      },
    ];

    const filename = "assignments.csv";
    await generateCSV(assignments, filename);

    // Send file as a response
    res.download(filename, (err) => {
      if (err) console.error("Error sending file:", err);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate CSV" });
  }
});

module.exports = router;
