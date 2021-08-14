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

let today = moment().format("YYYYMMDD");

// let stockNumber = fs.readFileSync("stock.txt", "utf8");

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
      (sql = "INSERT IGNORE INTO stock_price (stock_id, date, traded_amount, turnover, open_price, high_price, low_price, close_price, delta_price, transactions_number) VALUES ?"),
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


// 在資料庫的 stock 表格查看，這個代碼是否在我們的資料範圍內
function getStockFromDB(readFile) {
  return  new Promise((resolve, reject)=>{
      connection.query("SELECT * FROM stock WHERE stock_id = ?",[readFile], (err,result)=>{
      if(err){
        reject(err);
      }
      resolve(result);
      console.log("get->", readFile);
    }) 
  })
}

async function f() {
  try {
    const readFile = await getStockNumber();

    const checkStock = await getStockFromDB(readFile);

    if(checkStock.length === 0) {
        throw "這個代碼不在此資料庫的查詢範圍中";
      }

    // 有，去證交所爬資料回來
    const stock = await getData(readFile);
    let eachData = stock.data;


    let insertData = eachData.data.map((item) => {
      item = item.map((value) => {
        // value = value.replace(/,/g, "");
        // console.log(value);
        return value.replace(/,/g, "");
      });
      item[0] = (parseInt(item[0].replace(/\//g, "")) + 19110000).toString();
      item.unshift(stockNumber);
      return item;
    });

    // 資料放進資料庫
    const startInsert = await insertDataPromise(insertData);
    console.log(startInsert);

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
