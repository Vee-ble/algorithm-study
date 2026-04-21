class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size + 1 }, (_, i) => i);
  }

  find(node) {
    if (this.parent[node] === node) {
      return node;
    }

    this.parent[node] = this.find(this.parent[node]);

    return this.parent[node];
  }

  union(node1, node2) {
    const root1 = this.find(node1);
    const root2 = this.find(node2);

    if (root1 !== root2) {
      this.parent[node1] = root2;
    }
  }

  isSameGroup(node1, node2) {
    return this.find(node1) === this.find(node2);
  }
}
