function solution(n, k) {
  const candidates = n.toString(k).split("0");
  let count = 0;

  for (const s of candidates) {
    if (s === "") continue;
    // 로직 분리(Refec)
    const num = Number(s);

    // 명시적 카운팅(Refec)
    if (isPrime(num)) {
      count++;
    }
  }
  return count;
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  const sqrt = Math.sqrt(n);
  for (let i = 5; i <= sqrt; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}
