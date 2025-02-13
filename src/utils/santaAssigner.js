const Employee = require("../models/Employee");
const Assignment = require("../models/Assignment");

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

/**
 * Assigns secret children while avoiding last year's assignments.
 * @returns {Promise<Array<Object>>} - The new assignments.
 */
async function assignSecretSanta() {
  
  const employees = await Employee.find();
  if (employees.length < 2) throw new Error("Not enough employees for Secret Santa!");

  const lastYearAssignments = await Assignment.find({ year: new Date().getFullYear() - 1 });
  const lastYearMap = new Map();
  
  lastYearAssignments.forEach(({ employeeEmail, secretChildEmail }) => {
    lastYearMap.set(employeeEmail, secretChildEmail);
  });

  let availableChildren = [...employees];
  let success = false;

  for (let i = 0; i < 100; i++) {
    availableChildren = shuffleArray([...employees]); // Shuffle employees
    let valid = true;
    const assignments = employees.map(emp => {
      const possibleChildren = availableChildren.filter(child =>
        child.email !== emp.email &&
        lastYearMap.get(emp.email) !== child.email
      );

      if (possibleChildren.length === 0) {
        valid = false; // No valid assignment, retry
        return null;
      }

      const assignedChild = possibleChildren[0];
      availableChildren = availableChildren.filter(c => c !== assignedChild);

      return {
        employeeEmail: emp.email,
        secretChildEmail: assignedChild.email,
        year: new Date().getFullYear(),
      };
    });

    if (valid) {
      success = true;
      await Assignment.insertMany(assignments);
      return assignments;
    }
  }
 if (!success) throw new Error("Failed to generate a valid Secret Santa assignment.")

}

module.exports = { assignSecretSanta };
