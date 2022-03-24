function fibo(n) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; ++i) [a, b] = [b, a + b];
  return a;
}

for (let i = 0; i <= 12; ++i) console.log(`${fibo(i)} `);
