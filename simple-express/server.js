const { response, request } = require("express");
const express = require("express");
const stock = require("./utils/stock");
const stockNumber = require("./utils/stockNumber");
const twse = require("./utils/twse");

let app = express();
const cors = require("cors");
const connection = require("./utils/stock");
app.use(cors());

// console.log(stockNumber.getStockNumber());

app.use((request, response, next) => {
  console.log("我是第一個中間件");
  next();
});

app.use((request, response, next) => {
  let currentTime = new Date();
  console.log(`我是第二個中間件: ${currentTime}`);
  next();
});

app.get("/", (request, response, next) => {
  response.send("Hello 這是首頁");
});

app.get("/about", (request, response, next) => {
  response.send("關於我們");
});

app.get("/abc", (request, response, next) => {
  response.send("被你發現abc了");
});

app.get("/stock", async (request, response, next) => {
  let stockNum = await stockNumber.getStockNumber();
  // let result = await twse.getData(stockNum);
  response.json(stockNum);
});

app.get("/stock/:stockNum", (request, response, next) => {
  // let stockNum = await stockNumber.getStockNumber();
  // let result = await twse.getData(stockNum);
  // console.log(request.params.stockNum);
  // if (request.params.stockNum !== stockNum) {
  //   return response.send(`沒有提供這個股票代碼: ${request.params.stockNum}`);
  //   // 在股票代碼不對的情況下，該怎麼送到下面的use
  //  上面是直接從網站拿資料
  // }
  const sqlSelect = "SELECT * FROM stock_price WHERE stock_id = ?";
  connection.query(sqlSelect, [request.params.stockNum], (err, result) => {
    response.json(result);
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.send("Not Found 404");
});

app.listen(3001, () => {
  console.log("web server啟動，running on port 3001");
});
