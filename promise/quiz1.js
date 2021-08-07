// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);

// 執行順序為: 4 --> 1 --> 3 --> 5 --> 2

/* 從上到下先略過function印出 4
function被呼叫印出 1
setTimeout丟給 Webapis 做，再往下印出 3
function結束，往下印出 5
stack內全部的任務都完成，再把setTimeout拿來，印出 2 */
