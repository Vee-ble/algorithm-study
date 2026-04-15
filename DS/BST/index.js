/**
 * BST (이진 탐색 트리):
 * 노드의 왼쪽 자식은 부모보다 작은 값, 오른쪽 자식은 큰 값을 가지도록
 * 포인터(left, right)를 이용해 연결한 비선형 자료구조.
 *
 * 1) 노드 클래스
 * 속성 - left, right, val
 *
 *
 * 2) BST 클래스
 * 속성 - root(트리의 시작점)
 * 메서드 - insert, search
 *
 * 추후 - 전위, 중위, 후위 구현
 */

class Node {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let cur = this.root;
    while (true) {
      if (val === cur.val) return;

      if (val < cur.val) {
        if (!cur.left) {
          cur.left = newNode;
          return;
        }
        cur = cur.left;
      } else if (val > cur.val) {
        if (!cur.right) {
          cur.right = newNode;
          return;
        }
        cur = cur.right;
      }
    }
  }

  search(val) {
    let cur = this.root;

    while (cur) {
      if (val === cur.val) {
        return cur;
      }
      if (val < cur.val) {
        cur = cur.left;
      } else if (val > cur.val) {
        cur = cur.right;
      }
    }
    return null;
  }
}
