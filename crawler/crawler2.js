const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let today = moment().format("YYYYMMDD");

// let stockNumber = fs.readFileSync("stock.txt", "utf8");

new Promise((resolve, reject) => {
  //   fs.readFile("stock.txt", "utf8", (err, stockNumber) => {
  //     if (err) {
  //       //   console.error(err);
  //       reject(err);
  //     } else {
  //       //   console.log(stockNumber);
  //       resolve(stockNumber);
  //     }
  //   });
  let stockNumber = fs.readFileSync("stock.txt", "utf8");
  if (stockNumber !== null) {
    resolve(stockNumber);
  } else {
    reject(`出錯了`);
  }
})
  .then((stockNumber) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: today,
        stockNo: stockNumber,
      },
    });
  })
  .then(function (response) {
    // handle success
    console.log(response.data);
  });
