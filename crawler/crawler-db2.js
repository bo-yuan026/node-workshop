const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
const { resolve } = require("path");
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
    throw err;
  }
});

let today = moment().format("YYYYMMDD");

let stockNumber = fs.readFileSync("stock.txt", "utf8");

function getStockNumber() {
  return new Promise((resolve, reject) => {
    let stockNumber = fs.readFileSync("stock.txt", "utf8");
    if (stockNumber !== null) {
      resolve(stockNumber);
    } else {
      reject(`出錯了`);
    }
  });
}

function getData(stockNumber) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: today,
      stockNo: stockNumber,
    },
  });
}

function insertDataPromise(insertData) {
  return new Promise((resolve, reject) => {
    connection.query(
      (sql = "INSERT INTO stock_price (stock_id, date, open_price, high_price, low_price, close_price, delta_price, transactions, volume, amount) VALUES ?"),
      [insertData],
      function (error, result, fields) {
        if (error) {
          reject(error);
        }
        resolve("成功傳入資料庫");
      }
    );
  });
}

let arr = [];
async function f() {
  try {
    const readFile = await getStockNumber();
    const stock = await getData(readFile);
    // console.log(stock.data);
    let eachData = stock.data;

    for (i = 0; i < eachData.data.length; i++) {
      // arr = stock.data.data[i];
      let insertData = eachData.data.map((item) => {
        item = item.map((value) => {
          value = value.replace(/,/g, "");
          // console.log(value);
          return value.replace(/,/g, "");
        });
        item[0] = (parseInt(item[0].replace(/\//g, "")) + 19110000).toString();
        item.unshift(stockNumber);
        return item;
      });
      // return insertData;
      const startInsert = await insertDataPromise(insertData);
      console.log(startInsert);
    }

    // const startInsert = await insertDataPromise(insertData);
  } catch (error) {
    console.error("**********");
    console.error(error);
  } finally {
    // 不關閉連線，認為程式一直在執行
    connection.end();
  }
}

f();
