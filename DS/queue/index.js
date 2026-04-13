/**
 * 큐는 FIFO 구조를 가지며, singly linked list로 구현한다.
 * 값과 포인터를 가진 Node를 가지고, 이 노드들이 한 방향으로 연결되어
 * 맨 뒤에서(tail) Node가 추가되고, 맨 앞에서(head) 제거되는 메커니즘.
 * BFS 구현에 주로 사용
 *
 */

/**
 * 1) Node 클래스
 * 속성 - value, next
 *
 * 2) Queue 클래스
 * 속성 - head, tail, size
 * 메서드 - enqueue, dequeue, peek, isEmpty
 */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(val) {
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

  dequeue() {
    if (this.size === 0) return null;

    const dequeuedNode = this.head;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.size--;

    return dequeuedNode.val;
  }

  peek() {
    if (this.size === 0) return null;
    return this.head.val;
  }

  isEmpty() {
    return this.size === 0;
  }
}
