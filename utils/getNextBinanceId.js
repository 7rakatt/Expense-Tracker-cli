const fs = require("fs");
const filePath = "./binance.json";
 const getNextBinanceId = () => {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(fileContent);
    return tasks.length + 1;
  }
  return 1;
};

module.exports = getNextBinanceId;