const { response, request } = require("express");
const express = require("express");
const stock = require("./utils/stock");
const stockNumber = require("./utils/stockNumber");
const twse = require("./utils/twse");

let app = express();

console.log(stock);

app.listen(3000, () => {
  console.log("web server啟動!!");
});

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
