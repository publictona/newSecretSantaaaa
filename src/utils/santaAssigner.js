const fs = require("fs").promises;
const path = require("path");

const dbFilePath = path.join(__dirname, "db.json");

// Shuffle function to randomize the employees
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

async function assignSecretSanta(year) {
  try {
    // Read the database file
    const data = await fs.readFile(dbFilePath, "utf8");
    const db = JSON.parse(data);

    const employees = db.employees;
    if (employees.length < 2) throw new Error("Not enough employees for Secret Santa!");

    // Get last year's assignments
    const lastYearAssignments = db.assignments.filter(a => a.year === year - 1);
    const lastYearMap = new Map(lastYearAssignments.map(a => [a.employeeEmail, a.secretChildEmail]));

    let success = false;
    let assignments = [];

    for (let i = 0; i < 100; i++) {
      let availableChildren = shuffleArray([...employees]);
      let tempAssignments = [];
      let valid = true;

      for (let emp of employees) {
        const possibleChildren = availableChildren.filter(child =>
          child.email !== emp.email && lastYearMap.get(emp.email) !== child.email
        );

        if (possibleChildren.length === 0) {
          valid = false;
          break;
        }

        const assignedChild = possibleChildren[0];
        availableChildren = availableChildren.filter(c => c.email !== assignedChild.email);

        tempAssignments.push({
          employeeEmail: emp.email,
          secretChildEmail: assignedChild.email,
          year,
        });
      }

      if (valid) {
        success = true;
        assignments = tempAssignments;
        break;
      }
    }

    if (!success) throw new Error("Failed to generate a valid Secret Santa assignment.");

    // Save the assignments back to db.json
    db.assignments.push(...assignments);
    await fs.writeFile(dbFilePath, JSON.stringify(db, null, 2));

    return assignments;
  } catch (error) {
    console.error("🔥 Error in assignSecretSanta:", error);
    throw error;
  }
}
module.exports = { assignSecretSanta };
