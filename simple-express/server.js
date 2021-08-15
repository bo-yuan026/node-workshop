const express = require("express");

let app = express();

app.listen(3000, () => {
  console.log("web server啟動!!");
});

app.get("/", (request, response, next) => {
  response.send("Hello 這是首頁");
});
app.get("/about", (request, response, next) => {
  response.send("關於我們");
});
