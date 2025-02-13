const fs = require("fs");
const { format } = require("fast-csv");

const generateCSV = (data, filename = "output.csv") => {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filename);
    const csvStream = format({ headers: true });

    csvStream.pipe(ws);
    data.forEach((row) => csvStream.write(row));
    csvStream.end();

    ws.on("finish", () => resolve(filename));
    ws.on("error", (error) => reject(error));
  });
};

module.exports = generateCSV;
