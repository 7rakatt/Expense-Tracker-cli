const fs = require("fs");
const filePath = "./binance.json";
let summry = 0;
const getBinanceSummry =  () => {
  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.log("Error", err);
      process.exit();
    }
    const binancesAsjson = JSON.parse(fileContent);
    for (let i = 0; i < binancesAsjson.length; i++) {
      let binanceAmount = binancesAsjson[i]["amount"]
      binanceAmount = binanceAmount.slice(1);
      summry += +binanceAmount;
    }
      console.log(`Total expenses: $${summry}`);
  });
};

module.exports = getBinanceSummry;