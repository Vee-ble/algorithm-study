function solution(msg) {
  const dictionary = new Map(
    Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), i + 1])
  );
  let i = 0;
  let result = [];
  while (i < msg.length) {
    let combinedString = msg[i];
    while (msg[i + 1] && dictionary.has(combinedString + msg[i + 1])) {
      combinedString = combinedString + msg[i + 1];
      i++;
    }
    dictionary.set(combinedString + msg[i + 1], dictionary.size + 1);
    result.push(dictionary.get(combinedString));
    i++;
  }
  return result;
}
