import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [stockData, setStockData] = useState([]);
  const [keyword, setKeyword] = useState("");

  // useEffect((keyword) => {
  //   axios.get(`http://localhost:3001/stock/${keyword}`).then((response) => {
  //     setStockData(response.data);
  //   });
  // }, []);

  const submitStockNumber = () => {
    const stockNum = document.getElementById("stockNum");
    const Num = stockNum.value;
    axios.get(`http://localhost:3001/stock/${Num}`).then((response) => {
      if (response.data.length < 1) {
        alert("查無結果");
      }
      setStockData(response.data);
    });
  };

  return (
    <>
      <input
        type="text"
        id="stockNum"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button onClick={submitStockNumber}>查詢</button>
      <span>網站試營運中，目前只有提供 2330 、 2603 、 2618 三個查詢號碼</span>
      {stockData.map((data, i) => {
        return (
          <div className="App" key={i}>
            <small>第{[i + 1]}筆資料</small>
            <h2>
              交易日期:
              {data.date.split("T16:00:00.000Z")}
            </h2>
            <div>
              股票代碼 → <strong>{data.stock_id}</strong>
            </div>
            <p>
              開盤價: {data.open_price} | 最高價: {data.high_price} | 最低價: {data.low_price} | 收盤價: {data.close_price} | 漲跌價差: {data.delta_price}
            </p>
            <p>
              成交筆數: {data.transactions_number} | 成交總金額: {data.turnover} | 成交總股數: {data.traded_amount}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default App;
