/**
 * 힙은 완전 이진 트리 구조를 갖고, 부모 노드가 자식 노드보다 항상 작다(또는 크다)는 상하 관계만 유지될 뿐, 형제 노드(좌/우 자식) 사이에는 대소 관계가 전혀 없기에 느슨한 정렬을 갖는다
 * 자식의 왼쪽 index는 i * 2 + 1, 오른쪽은 i * 2 + 2, 자식을 이용한 부모 index는 Math.floor((i - 1) / 2) 이다.
 * bubbleUp으로 삽입된 새 노드가 정렬되고, pop한 뒤 bubbleDown으로 정렬된다.
 * isMax 속성으로 최대, 최소힙 여부를 결정하여 최적화한다.
 */

class Heap {
  constructor(isMax = false) {
    this.heap = [];
    this.isMax = isMax;
  }

  getParentIdx(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIdx(i) {
    return i * 2 + 1;
  }

  getRightChildIdx(i) {
    return i * 2 + 2;
  }
  top() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let targetIdx = this.heap.length - 1;
    const targetNode = this.heap[targetIdx];

    while (targetIdx > 0) {
      const parentIdx = this.getParentIdx(targetIdx);
      const parentNode = this.heap[parentIdx];

      if (this.isMax ? targetNode > parentNode : targetNode < parentNode) {
        this.heap[targetIdx] = parentNode;
        targetIdx = parentIdx;
      } else {
        break;
      }
    }
    this.heap[targetIdx] = targetNode;
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return root;
  }

  bubbleDown() {
    let targetIdx = 0;
    let targetNode = this.heap[targetIdx];
    const length = this.size();

    while (true) {
      const leftIdx = this.getLeftChildIdx(targetIdx);
      const rightIdx = this.getRightChildIdx(targetIdx);
      let swapIdx = null;

      if (leftIdx < length) {
        const left = this.heap[leftIdx];
        if (this.isMax ? left > targetNode : left < targetNode) {
          swapIdx = leftIdx;
        }
      }

      if (rightIdx < length) {
        const right = this.heap[rightIdx];

        if (swapIdx === null) {
          if (this.isMax ? right > targetNode : right < targetNode) {
            swapIdx = rightIdx;
          }
        } else {
          const left = this.heap[leftIdx];
          if (this.isMax ? right > left : right < left) {
            swapIdx = rightIdx;
          }
        }
      }

      if (swapIdx === null) break;

      this.heap[targetIdx] = this.heap[swapIdx];
      targetIdx = swapIdx;
    }
    this.heap[targetIdx] = targetNode;
  }
}
