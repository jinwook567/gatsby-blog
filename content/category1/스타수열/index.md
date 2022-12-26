---
title: 스타수열
date: 2022-10-13
description: 백트래킹
---

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/70130)

# 해결 전략

처음에 이 문제를 완전탐색 형태로 해결하고자 하였다. a의 부분 수열을 모두 만들고, 스타 수열인지 확인하는 방식으로 알고리즘을 짰다. 하지만 이 방식은, a의 길이가 최대 500,000이므로 절대 만족할 수 없다. 조합의 경우 O(2^n)의 시간 복잡도를 가지기 때문이다.

그렇다면 **반대로 생각해봐야 한다.** 모든 부분 수열을 만들어보고 스타 수열인지 검증하는 대신, 주어진 배열을 활용해서 직접 스타 수열을 만들어보면 된다!

스타수열을 만들 때, 우리는 중복된 숫자가 꼭 필요하다. 따라서 중복된 숫자가 많을수록 더 길이가 긴 스타수열을 만들 수 있다. 하지만 중복된 숫자가 많다고 해서 꼭 스타수열의 길이가 긴 것은 아니기에, 중복된 숫자의 개수가 큰 순서대로 검증해나가는 백트래킹 방식을 사용하면 된다.

`[1,1,1,1,1,1,1,1,1,1,2,3,2,3,2]`과 같은 배열의 경우 1이 가장 많은 중복된 숫자지만, 1을 교집합으로 두었을 때 스타 수열을 만들 수 없다. 1이 연속적으로 배치되어 있어 i번쨰와 i+1번째가 같기 때문이다. 따라서 그 다음으로 중복된 개수가 많은 2를 검증해야 한다.

스타 수열 조건을 만족하는 부분 수열들을 찾아나가면서 합하는 방식으로 스타 수열의 최대 길이를 구할 것이다. 최대한 길이가 긴 스타 수열을 구하기 위해서는 좌측부터 만족시키면서 나가면 된다. 그래야 우측에 남은 배열의 길이가 길어져 더 길이가 긴 부분 수열을 만들 수 있다.

# 전체 코드

```js
function solution(a) {
  //배열 내에서, 중복된 숫자의 순서가 많은 순서대로 정렬한다.
  const obj = {};
  a.forEach(v => {
    if (!obj[v]) obj[v] = 1;
    else obj[v] += 1;
  });

  const sameNumberCounts = Object.entries(obj).sort((a, b) => b[1] - a[1]);

  //스타 수열을 만족하는 최대 부분 수열을 찾는다.
  let answer = 0;

  for (let [number, cnt] of sameNumberCounts) {
    number = Number(number);
    if (answer > cnt) break;

    let len = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i + 1] === undefined) continue;

      if (a[i] === number && a[i + 1] !== number) {
        len += 2;
        i++;
        continue;
      }
      //좌측부터 만족하는지 확인, 좌측부터 만족하는지 확인해야 남는 우측 길이가 김.

      if (a[i] !== number && a[i + 1] === number) {
        len += 2;
        i++;
        continue;
      }
      //좌측이 만족하지 않는다면 우측으로 확인
    }
    answer = Math.max(answer, len);
  }
  return answer;
}
```
