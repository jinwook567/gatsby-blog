# Gatsby Blog Template

[Demo](https://jinwook567.github.io/blog)

# 지원 기능

- 카테고리 기능 (파일 구조에 따른 카테고리 분류)
- 블로그 정보 설정(gatsby-my-config)
- sitemap 자동 생성
- github actions를 사용한 자동 배포(main branch)
- Google analytics4 지원

# 시작

## 1. 템플릿 실행

```
npm install
npm start
```

## 2. 블로그 정보 설정

`gatsby-my-config.ts`의 파일의 `config` 속성을 수정해줍니다.

```ts
siteMetadata: {
    title: '블로그명',
    siteUrl: '블로그 주소',
    author: {
      name: '저자명',
      description: '저자 설명',
      social: {
        github: 'https://github.com/jinwook567',
        email: 'dlwlsdnr567@naver.com',
        instagram: '',
      },
    },
  },
```

social을 추가하고 싶지 않다면 속성을 삭제하지말고 빈 문자열을 삽입해주세요.

구글 애널리틱스를 사용한다면 `.env` 파일을 생성하고 GA_TRACKING_ID 값을 추가해주세요.
github actions를 활용한 자동 배포를 사용하신다면 Repository secrets에 GA_TRACKING_ID 값을 추가해주세요.

## 3. 카테고리 생성

파일 구조에 따라서 카테고리를 분류합니다.

`content` 폴더 내 최상단 폴더(=카테고리 폴더)가 카테고리로 적용됩니다.
카테고리명은 폴더명과 동일합니다.

```
content
├── category1
├── category2
├── category3
└── category4
```

위와 같은 파일 구조를 가질 경우 category1, category2, category3, category4로 카테고리가 분류됩니다.

카테고리 폴더 하위에 존재하는 모든 글은 해당 카테고리에 속하게 됩니다.
카테고리 폴더의 하위 폴더는 여러 계층으로 구성되도 상관없습니다.

## 4. 글 작성하기

카테고리 폴더 아래 폴더를 생성하고 `index.md` 파일을 생성합니다.
해당 파일을 markdown 문법으로 작성하면 됩니다.

```
content
├── category1
│   ├── post1
│   │   └── index.md
│   └── post2
│       └── index.md
├── category2
├── category3
└── category4
```

마크다운 문서의 부모 폴더는 페이지 경로를 생성하는데 사용됩니다.
위 예시의 경우 `category1/post1`, `category2/post2` 페이지 경로를 가지게 됩니다.

### index.md 필수 정보

index.md 파일의 상단에는 `title`, `description`, `date` 정보가 삽입되어야 합니다.

```
title: post title
description: post description
date: 2022-12-26
```

### 이미지 삽입

이미지를 사용하고자 하는 `index.md` 파일과 동일한 폴더에 이미지를 추가한 뒤에 마크다운 문법을 사용하여 불러옵니다.

## 5. 배포

### 자동 배포

main branch에 push하면 github actions를 활용하여 gh-pages 브랜치에 자동으로 배포됩니다.
(참고: [github pages](https://pages.github.com/))

자동 배포를 원하지 않는다면 `.github` 폴더를 삭제해주세요.

### 명령어

```
npm run deploy
```
