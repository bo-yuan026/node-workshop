async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);
}

console.log(4);
asyncF();
console.log(5);

// 執行順序為: 4 --> 1 --> 5 --> 2 --> 3

/* 從上到下先略過function印出 4
function被呼叫印出 1
遇到 promise 丟給 Webapis ，也因為await所以 function 後面要等待
function外，繼續往下印出 5
stack內全部的任務都完成，再把setTimeout拿來，印出 2
有resolve所以繼續往下印出 3 */
