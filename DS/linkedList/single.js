/**
 * 단일 연결 리스트: head, tail까지 한 방향으로 연결되어 있고, 데이터를 넣고 뺄 수 있다.
 *
 * 1) Node 클래스
 * 속성 - next, val
 *
 * 2) SinglyLinkedList 클래스
 * 속성 - head, tail, size
 * push(val): 맨 뒤(Tail)에 노드 추가
 * pop(): 맨 뒤(Tail)의 노드 제거 및 반환
 * unshift(val): 맨 앞(Head)에 노드 추가
 * shift(): 맨 앞(Head)의 노드 제거 및 반환 (앞서 구현하신 큐의 dequeue와 동일)
 */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  pop() {
    if (this.size === 0) return null;
    const temp = this.tail;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let cur = this.head;

      while (cur.next !== this.tail) {
        cur = cur.next;
      }
      this.tail = cur;
      this.tail.next = null;
    }
    this.size--;

    return temp.val;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  shift() {
    if (this.size === 0) return null;
    const temp = this.head;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      temp.next = null;
    }
    this.size--;

    return temp.val;
  }
}
