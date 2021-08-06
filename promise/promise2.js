let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // resolve 是解決用的函式 --> 最終完成
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // reject 是拒絕用的函式 --> 最終失敗
        reject(`失敗了: ${job}`);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString}`);
//預計順序： 刷牙 --> 吃早餐 -->做作業

let job = doWork("刷牙", 3000, true);
// console.log(job);

// then
job
  .then((resolve) => {
    console.log("第 1 個函式被呼叫了", resolve);
    return doWork("吃早餐", 5000, true);
    // 即使我們回傳的是數字，還是會包成 promise 物件
    // Promise.resolve(1)
  })
  .then((result) => {
    console.log("第 2 個 then", result);
    return doWork("寫作業", 3000, true);
  })
  .then((result) => {
    console.log("第 3 個 then", result);
    return doWork("睡午覺", 4000, true);
  })
  .then((result) => {
    console.log("第 4 個 then", result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("你好");
  });
