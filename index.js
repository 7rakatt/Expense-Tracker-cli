#!/usr/bin/env node
const fs =require ("fs");
const { Command } =require("commander");
const prog = new Command();
const filePath = "./binance.json";
const getNextBinanceId = require('./utils/getNextBinanceId.js')
const getBinanceSummry = require("./utils/getBinanceSummry.js");


prog
  .name("Expense-Tracker-cli")
  .description("simple expense tracker application to manage your finances")
  .version("1.0.0");

prog
  .command("add")
  .description("add new binance")
  .option("--description")
  .argument("description", "description of binance")
  .option("--amount")
  .argument("amount", "amount of binance")
  .action((description, amount) => {
    const taskId = getNextBinanceId();
    const newBinance = {
      id: taskId,
      Date: new Date().toISOString().slice(0, 10),
      description: description,
      amount: amount,
    };
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, "utf-8", (err, fileContent) => {
        if (err) {
          console.log("Error", err);
          process.exit();
        }
        const fileContentAsjson = JSON.parse(fileContent);
        fileContentAsjson.push(newBinance);
        fs.writeFile(
          filePath,
          JSON.stringify(fileContentAsjson, null, 2),
          "utf8",
          () => {
            console.log("Adding binance done");
          }
        );
      });
    } else {
      fs.writeFile(filePath, JSON.stringify([newBinance]), "utf8", () => {
        console.log("Adding binance done");
      });
    }
  });

prog
  .command("delete")
  .description("delet a binance")
  .option('--id')
  .argument("binance id", "binance id")
  .action((binanceId, option) => {
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) {
        console.log("Error", err);
        process.exit();
      }
      let binances = JSON.parse(content);
      const binanceIndex = binances.findIndex((binance) => binance.id == binanceId);
      if (binanceIndex !== -1) {
        binances.splice(binanceIndex, 1);
        fs.writeFile(
          filePath,
          JSON.stringify(binances, null, 2),
          "utf-8",
          (err) => {
            if (err) {
              console.log("Error", err);
              process.exit();
            }
            console.log(`binance deleted successfully.`);
          }
        );
      } else {
        console.log(`binance with ID ${binanceId} not found.`);
      }
    });
  });


prog
  .command("list")
  .alias("ls")
  .description("list of binances")
  .action(() => {
    fs.readFile(filePath, 'utf-8',(err, content) => {
      if (err) {
        console.log('Error', err)
        process.exit();
      }
      let binances = JSON.parse(content);
      console.table(binances);
    })
  })


prog
  .command("summary")
  .alias("s")
  .description("summary of bainances")
  .action(() => {
    fs.readFile(filePath, 'utf-8',(err, content) => {
      if (err) {
        console.log('Error', err)
        process.exit();
      }
      getBinanceSummry();
    })
  })


prog.parse(process.argv);
