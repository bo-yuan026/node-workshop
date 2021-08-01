console.log("Hello World");

function sum(n) {
  let result = 0;

  for (i = 1; i <= n; i++) {
    result += i;
  } //for
  return result;
}

console.log(sum(1)); //
console.log(sum(2)); // 3
