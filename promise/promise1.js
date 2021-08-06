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
console.log(job);

// then
job.then(
  function (resolve) {
    // 負責接受 resolve (成功)
    console.log("第一個函式被呼叫了", resolve);
  },
  function (reject) {
    // 負責接受 reject (失敗)
    console.log("第一個函式被呼叫了", reject);
  }
);

let job1 = doWork("吃早餐", 5000, false);
let job2 = doWork("寫作業", 3000, true);
job1.then(
  function (resolve) {
    // 負責接受 resolve (成功)
    console.log("第一個函式被呼叫了", resolve);
  },
  function (reject) {
    // 負責接受 reject (失敗)
    console.log("第一個函式被呼叫了", reject);
  }
);
job2.then(
  function (resolve) {
    // 負責接受 resolve (成功)
    console.log("第一個函式被呼叫了", resolve);
  },
  function (reject) {
    // 負責接受 reject (失敗)
    console.log("第一個函式被呼叫了", reject);
  }
);

// 結果是 刷牙->寫作業->吃早餐 ，依據時間出現
