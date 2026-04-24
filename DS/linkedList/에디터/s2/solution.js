const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cursor = null;
  }

  push(val) {
    const newNode = new Node(val);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }

  initCursor() {
    this.cursor = this.tail;
  }

  moveLeft() {
    if (this.cursor !== null) {
      this.cursor = this.cursor.prev;
    }
  }

  moveRight() {
    if (this.cursor === null) {
      if (this.head !== null) this.cursor = this.head;
    } else if (this.cursor.next !== null) {
      this.cursor = this.cursor.next;
    }
  }

  insertChar(val) {
    const newNode = new Node(val);
    this.size++;

    if (this.cursor === null) {
      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    } else if (this.cursor === this.tail) {
      this.cursor.next = newNode;
      newNode.prev = this.cursor;
      this.tail = newNode;
    } else {
      const nextNode = this.cursor.next;
      newNode.prev = this.cursor;
      newNode.next = nextNode;
      this.cursor.next = newNode;
      nextNode.prev = newNode;
    }
    this.cursor = newNode;
  }

  deleteChar() {
    if (this.cursor === null) return;

    this.size--;
    const targetNode = this.cursor;

    if (targetNode === this.head && targetNode === this.tail) {
      this.head = null;
      this.tail = null;
      this.cursor = null;
    } else if (targetNode === this.head) {
      this.head = targetNode.next;
      this.head.prev = null;
      this.cursor = null;
    } else if (targetNode === this.tail) {
      this.tail = targetNode.prev;
      this.tail.next = null;
      this.cursor = this.tail;
    } else {
      const prevNode = targetNode.prev;
      const nextNode = targetNode.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      this.cursor = prevNode;
    }
  }

  getResult() {
    let cur = this.head;
    const res = [];
    while (cur) {
      res.push(cur.val);
      cur = cur.next;
    }
    return res.join("");
  }
}

function solution() {
  const initStr = input[0];
  const M = Number(input[1]);

  const editor = new DoublyLinkedList();

  for (let char of initStr) {
    editor.push(char);
  }

  editor.initCursor();

  for (let i = 2; i < 2 + M; i++) {
    const line = input[i].split(" ");
    const cmd = line[0];

    if (cmd === "L") {
      editor.moveLeft();
    } else if (cmd === "D") {
      editor.moveRight();
    } else if (cmd === "B") {
      editor.deleteChar();
    } else if (cmd === "P") {
      editor.insertChar(line[1]);
    }
  }
  console.log(editor.getResult());
}

solution();
