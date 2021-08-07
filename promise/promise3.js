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

async function f() {
  try {
    let job = await doWork("刷牙", 3000, true);
    console.log(job);
    let job2 = await doWork("吃早餐", 5000, true);
    console.log(job2);
    let job3 = await doWork("寫作業", 3000, false);
    console.log(job3);
    let job4 = await doWork("睡午覺", 4000, false);
    console.log(job4);
  } catch (error) {
    console.log(error);
  }
}
f();
