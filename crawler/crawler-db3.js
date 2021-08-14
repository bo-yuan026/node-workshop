const getStockNumber = require("./components/GetStockNumber");
const connection = require("./components/ConnectDataBase");
const getData = require("./components/GetDataFromTWSE");

function insertDataPromise(insertData) {
  return new Promise((resolve, reject) => {
    connection.query(
      (sql =
        "INSERT IGNORE INTO stock_price (stock_id, date, traded_amount, turnover, open_price, high_price, low_price, close_price, delta_price, transactions_number) VALUES ?"),
      [insertData],
      function (error, result, fields) {
        if (error) {
          reject(error);
        }
        // console.log(result);
        resolve("成功傳入資料庫");
      }
    );
  });
}

async function f() {
  try {
    const readFile = await getStockNumber.getStockNumber();

    // 在資料庫的 stock 表格查看，這個代碼是否在我們的資料範圍內
    // 下面的query要寫成queryAsync，才會成功await
    let checkStock = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?", [readFile]);
    if (checkStock.length === 0) {
      throw "這個代碼不在此資料庫的查詢範圍中";
    }

    const insertData = await getData.getData(readFile);
    // console.log(insertData);

    // 資料放進資料庫
    const startInsert = await insertDataPromise(insertData);
    console.log(startInsert);
  } catch (error) {
    console.error("**********\n", error);
  } finally {
    // 不關閉連線，認為程式一直在執行
    connection.end();
  }
}

f();
