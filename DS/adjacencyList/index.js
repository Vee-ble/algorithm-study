/**
 * 인접 리스트: 그래프(Graph)의 정점(Node)과 간선(Edge)의 연결 관계를 저장하는 가장 효율적인 방법
 * 
 * 클래스명: Graph
 * 속성 (Properties):
    adjacencyList: 정점을 Key로, 인접 노드 배열을 Value로 갖는 Map (또는 일반 객체 {}).
    isDirected: 방향 그래프인지 무방향 그래프인지 결정하는 플래그.
 
    
 * 핵심 메서드: 
    addVertex(vertex) - 그래프에 새로운 정점 추가.
      핵심 로직: adjacencyList에 해당 vertex가 존재하는지 확인하고, 없다면 vertex를 Key로 하고 빈 배열 []을 Value로 초기화
      
    addEdge(vertex1, vertex2) - 두 정점 사이에 간선 연결
      핵심 로직: 방향 여부와 상관없이 vertex1의 배열에 vertex2를 추가
      만약 무방향 그래프(isDirected === false)라면, 반대편인 vertex2의 배열에도 vertex1 추가
 */

class graph {
  constructor() {
    this.adjacencyList = new Map();
    this.isDirected = false;
  }

  addVtx(vtx) {
    if (!this.adjacencyList.has(vtx)) {
      this.adjacencyList.set(vtx, []);
    }
  }

  addEdge(v1, v2) {
    if (!this.adjacencyList.has(v1) || !this.adjacencyList.has(v2)) {
      return;
    }

    this.adjacencyList.get(v1).push(v2);

    if (!this.isDirected) {
      this.adjacencyList.get(v2).push(v1);
    }
  }
}
