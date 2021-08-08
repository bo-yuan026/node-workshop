const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});

// 不關閉連線，認為程式一直在執行
connection.end();

// let today = moment().format("YYYYMMDD");

// let stockNumber = fs.readFileSync("stock.txt", "utf8");

// function resultP() {
//   return new Promise((resolve, reject) => {
//     let stockNumber = fs.readFileSync("stock.txt", "utf8");
//     if (stockNumber !== null) {
//       resolve(stockNumber);
//     } else {
//       reject(`出錯了`);
//     }
//   });
// }

// function resultS(stockNumber) {
//   return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     params: {
//       response: "json",
//       date: today,
//       stockNo: stockNumber,
//     },
//   });
// }

// async function f() {
//   try {
//     const readFile = await resultP();
//     const stock = await resultS(readFile);
//     console.log(stock.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// f();
