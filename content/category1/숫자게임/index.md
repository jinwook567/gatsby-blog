---
title: 숫자 게임
date: 2022-10-05
description: 그리디
---

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/12987)

# 해결 전략

1. 우리는 B의 순서를 조정할 수 있다. 따라서 A의 순서를 바꿔도 상관없다. 순서가 변경된 A에 맞춰서 B의 순서를 변경하면 되기 때문이다.

2. 우리는 근소한 차이로 이길 때, 최대한 많이 이길 수 있다. 예시로 1을 이기는데 9를 낼 필요는 없다는 것이다. 내가 2를 보유하고 있다면 2를 내는 것이 이득이다. 나중에 7과 같은 큰 수를 만나면 그 때 9를 내야한다.

위의 두 생각을 바탕으로 나는 A와 B를 내림차순으로 정렬하였다. 내림차순으로 정렬한 이유는 순서대로 비교해보았을 때, 어떤 순서에서 B 요소가 A 요소보다 크다면 해당 순서의 B 요소는 다음 순서로 등장하는 A의 요소들 전부를 이길 수 있기 때문이다. 즉 가장 근소한 차이로 이길 수 있는 순서를 알 수 있다는 말이다.

나의 초기 알고리즘은 배열을 순회하면서 동일한 순서에 대해서 A 요소와 B 요소의 크기를 비교하는 것이였다. 하지만 이 알고리즘의 경우 이길 수 있는 개수를 누락시킨 다는 문제가 있었다. 예시는 아래와 같다.

`A: [5,3,1]`, `B:[4,2,0]`의 경우 내가 초기 작성한 알고리즘은 0이라는 정답을 도출한다. 하지만 실제 정답은 2이다. [A,B] 형태로 표현할 때, [3,4], [1,2] 2개의 케이스가 존재하기 때문이다.

누락되는 문제를 해결하기 위해서는 비교하는 방식을 변경해주면 된다. 동일한 순서에 대해서만 비교해주는 것이 아니라, 만일 A가 B보다 클 경우 B의 순서는 고정시켜 놓고 A의 순서만 움직인다. 만일 B가 A보다 클 경우에는 A와 B 순서 둘다 움직여주면 된다.

# 전체 코드

```javascript
function solution(A, B) {
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);

  let answer = 0;
  const len = A.length;

  for (let i = 0, j = 0; i < len; i++) {
    if (A[i] < B[j]) {
      j++;
      answer++;
    }
  }
  return answer;
}
```

# 추가

추가로 내림차순으로 정렬을 하지 않고, 최대힙을 이용하는 방법도 있다.

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  swap(aIndex, bIndex) {
    [this.heap[aIndex], this.heap[bIndex]] = [
      this.heap[bIndex],
      this.heap[aIndex],
    ];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (parentIndex >= 0 && this.heap[parentIndex] < value) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    const end = this.heap.pop();
    this.heap[0] = end;

    let currentIndex = 0;
    let leftIndex = 1;
    let rightIndex = 2;

    while (
      this.heap[currentIndex] < this.heap[leftIndex] ||
      this.heap[currentIndex] < this.heap[rightIndex]
    ) {
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        this.swap(currentIndex, rightIndex);
        currentIndex = rightIndex;
      } else {
        this.swap(currentIndex, leftIndex);
        currentIndex = leftIndex;
      }
      leftIndex = currentIndex * 2 + 1;
      rightIndex = currentIndex * 2 + 2;
    }
    return root;
  }
}

function solution(A, B) {
  const heap_A = new MaxHeap();
  const heap_B = new MaxHeap();
  const len = A.length;

  for (let i = 0; i < len; i++) {
    heap_A.push(A[i]);
    heap_B.push(B[i]);
  }
  let answer = 0;

  let maxA = heap_A.pop();
  let maxB = heap_B.pop();

  while (maxA) {
    if (maxA < maxB) {
      answer++;
      maxA = heap_A.pop();
      maxB = heap_B.pop();
    } else {
      maxA = heap_A.pop();
    }
  }
  return answer;
}
```
