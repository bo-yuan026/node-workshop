const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let stockNumber = fs.readFileSync("stock.txt", "utf8");
// console.log(stockNumber);

let today = moment().format("YYYYMMDD");

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: today,
      stockNo: stockNumber,
    },
  })
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
