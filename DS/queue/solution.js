const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addLast(val) {
    const newNode = new Node(val);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  removeFirst() {
    if (this.size === 0) return null;

    const removedNode = this.head;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head.next.prev = null;
      this.head = this.head.next;
      removedNode.next = null;
    }
    this.size--;

    return removedNode.val;
  }

  moveFirstToLast() {
    if (this.size >= 2) {
      const temp = this.head;
      this.head = this.head.next;
      temp.next = null;
      this.head.prev = null;

      temp.prev = this.tail;
      this.tail.next = temp;
      this.tail = temp;
    }
  }

  peekFirst() {
    if (this.size === 0) return null;
    return this.head.val;
  }
  peekLast() {
    if (this.size === 0) return null;
    return this.tail.val;
  }

  isEmpty() {
    return this.size === 0;
  }
}

function solution() {
  const N = Number(input);
  const deque = new Deque();

  for (let i = 1; i <= N; i++) {
    deque.addLast(i);
  }

  while (deque.size !== 1) {
    deque.removeFirst();
    deque.moveFirstToLast();
  }
  console.log(deque.head.val);
}
solution();

/**
 *
 * 1 2 3 4 5 6 7
 * 3 4 5 6 7 2
 * 5 6 7 2 4
 * 7 2 4 6
 * 4 6 2
 * 2 6
 * 6
 */
