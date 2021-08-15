const fs = require("fs");

function getStockNumber() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockNumber) => {
      if (err) {
        reject(`出錯了: ${err}`);
      } else {
        resolve(stockNumber);
        // console.log(stockNumber, "---------------");
      }
    });
  });
}

module.exports = { getStockNumber };
