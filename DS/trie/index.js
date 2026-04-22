/**
 * 문자열을 아주 빠르고 효율적으로 저장하고 탐색하기 위해 특화된 트리 구조.
 * 수만 개의 영단어가 있는 배열에서 apple을 찾으려면 배열을 다 뒤져야 하는데
 * 트라이를 사용하는 단어 개수와 상관없이 찾고자 하는 문자열의 길이 M만큼의 시간이 소요된다.
 * 
 * 동작 - '알파벳 한 글자'를 경로로 삼아 탐색. "CAT", "CAR"을 저장한다면 최상위 루트에서 "C" -> "A"까지 같은 경로를 공유하다가 마지막에 "T"와 "R"로 갈라진다.
 * 
 * 
 */

class Node {
  constructor() {
    this.children = new Map()
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new Node()
  }

  insert(word) {
    let cur = this.root 

    for(let c of word) {
      if(!cur.children.has(c)) {
        cur.children.set(c, new Node())
      }

      cur = cur.children.get(c)
    }
    cur.isEndOfWord=true
  }

  search(word) {
    let cur = this.root

    for(let c of word) {
      if(!cur.children.has(c)) {
        return false
      } 

      cur = cur.children.get(c)
    }

    return cur.isEndOfWord
  }
}