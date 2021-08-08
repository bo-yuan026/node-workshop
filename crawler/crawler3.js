const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let today = moment().format("YYYYMMDD");

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

// --------------------------------------

async function g() {
  let stockNumber = await new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockNumber) => {
      if (err) {
        //   console.error(err);
        reject(err);
      } else {
        // console.log(stockNumber);
        resolve(stockNumber);
      }
    });
  });
  let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: today,
      stockNo: stockNumber,
    },
  });
  console.log(response.data);
}

g();
