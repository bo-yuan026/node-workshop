const moment = require("moment");
const axios = require("axios");

async function getData(stockNumber) {
  // 去證交所爬資料回來
  let today = moment().format("YYYYMMDD");
  let stock = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: today,
      stockNo: stockNumber,
    },
  });

  let eachData = stock.data;

  let insertData = eachData.data.map((item) => {
    item = item.map((value) => {
      return value.replace(/,/g, "");
    });
    item[0] = (parseInt(item[0].replace(/\//g, "")) + 19110000).toString();
    item.unshift(stockNumber);
    return item;
  });
  return insertData;
}

module.exports = { getData };
