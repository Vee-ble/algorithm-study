/**
 *
 * deque는 양쪽 끝(Head와 Tail) 모두에서 데이터의 삽입과 삭제가 가능하다.
 * 이중 연결 리스트로 구현.
 * 슬라이딩 윈도우의 최댓값/최소값 찾기, 0-1 BFS
 */

/**
 * 1) Node 클래스
 * - 속성: val, next, prev
 *
 * 2) Deque 클래스
 * - 속성: head, tail, size
 * - 메서드
 * INSERT - addFirst, addLast
 * REMOVE - removeFirst, removeLast
 * PEEK & UTILS - peekFirst, peekLast, isEmpty
 */

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

  addFirst(val) {
    const newNode = new Node(val);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
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
  removeLast() {
    if (this.size === 0) return null;

    const removedNode = this.tail;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      removedNode.prev = null;
    }
    this.size--;

    return removedNode.val;
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
