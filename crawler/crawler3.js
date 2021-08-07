const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let today = moment().format("YYYYMMDD");

// let stockNumber = fs.readFileSync("stock.txt", "utf8");

async function f() {
  await new Promise((resolve, reject) => {
    let stockNumber = fs.readFileSync("stock.txt", "utf8");
    if (stockNumber !== null) {
      resolve(stockNumber);
    } else {
      reject(`出錯了`);
    }
  }).then((stockNumber) => {
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
        console.log(response.data.title);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });
}

f();
