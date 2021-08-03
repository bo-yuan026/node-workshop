let doWork = function (job, timer, cb) {
  // 模擬一個非同步工作
  setTimeout(() => {
    let dt = new Date();
    // callback 慣用的設計
    // 第一個參數: error
    // 第二個參數: 要回覆的資料
    cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
  }, timer);
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString}`);
//預計順序： 刷牙 --> 吃早餐 -->做作業

// doWork("刷牙", 3000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//   }
//   console.log(data);
// });

// doWork("吃早餐", 5000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//   }
//   console.log(data);
// });

// doWork("做作業", 3000, function (err, data) {
//   if (err) {
//     console.error("發生錯誤了:", err);
//   }
//   console.log(data);
// });

//
// 為了實現結果順序，必須用這種波動拳的方式寫
doWork("刷牙", 3000, function (err, data) {
  if (err) {
    console.error("發生錯誤了:", err);
  }
  console.log(data);
  doWork("吃早餐", 5000, function (err, data) {
    if (err) {
      console.error("發生錯誤了:", err);
    }
    console.log(data);
    doWork("做作業", 3000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
      }
      console.log(data);
    });
  });
});
