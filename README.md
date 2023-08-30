# SMAX

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/235289858-a8950f96-5c58-42f9-8a56-5abc50c541af.png" width="300">
</div>

## 프로젝트 소개

SMAX는 영화 정보 검색, 예약, 관리 등의 기능을 제공하는 웹 애플리케이션입니다. 이 프로젝트는 React, Redux Toolkit, RTK Query, Next.js, MongoDB 등의 기술을 사용하여 개발되었습니다.

## 프로젝트 목적

프로젝트의 주된 목적은 사용자들이 편리하게 영화 예매를 할 수 있도록 지원하는 웹 애플리케이션을 개발하는 것입니다

## 프로젝트 기간

- 2023.06.16 ~ 진행 중

## 😊 개발자 소개

|                                                            성창수                                                            |
| :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/jsdmas/jsdmas.github.io/assets/105098581/e237b4f3-26f3-4a37-8818-86787f5d858b" width="160px" /> |
|                                       [🙎🏻‍♂️ FE 팀원 : 창수](https://github.com/scs0209)                                        |
|                                                                                                                              |

## 데모

![영화 예매](https://github.com/scs0209/myBlog/assets/110822847/ebdfc9fb-596d-433b-9251-bbfd708533c5)

## 🔧 설치 및 실행

```
git clone https://github.com/scs0209/smart-talks.git

cd smart-talks

npm install

npm run dev or npm run start
```

## 🛠️ 사용 라이브러리 및 스택

### Technology Stack

- formatter : <img src="https://img.shields.io/badge/Eslint-blue" style="vertical-align: middle">, <img src="https://img.shields.io/badge/Prettier-pink" style="vertical-align: middle">
- API : <img src="https://img.shields.io/badge/Axios-yellow" style="vertical-align: middle">
- Style : <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=TailwindCSS&logoColor=white" style="vertical-align: middle">
- State Management: <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=Redux&logoColor=white" style="vertical-align: middle">
- Data Fetching: <img src="https://img.shields.io/badge/RTK Query-4EA8DE?logo=Redux&logoColor=white" style="vertical-align: middle">
- Framework: <img src="https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=white" style="vertical-align: middle">
- Language: <img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white" style="vertical-align: middle">, <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=TypeScript&logoColor=white" style="vertical-align: middle">
- Database: <img src="https://img.shields.io/badge/MongoDB-47A248?logo=MongoDB&logoColor=white" style="vertical-align: middle">
- ODM: <img src="https://img.shields.io/badge/Mongoose-880000?logoColor=white" style="vertical-align: middle">
- Package Manager: <img src="https://img.shields.io/badge/NPM-CB3837?logo=NPM&logoColor=white" style="vertical-align: middle">

### Development Environment

- IDE: <img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=Visual%20Studio%20Code&logoColor=white" style="vertical-align: middle">
- Repository Hosting: <img src="https://img.shields.io/badge/GitHub-181717?logo=GitHub&logoColor=white" style="vertical-align: middle">
- Version Control: <img src="https://img.shields.io/badge/Git-F05032?logo=Git&logoColor=white" style="vertical-align: middle">

## 라이브러리 선택 이유

- **Next.js**: 서버 사이드 렌더링(SSR)을 지원하여 검색 엔진 최적화(SEO)를 개선하고 초기 로딩 속도를 높이기 위해 사용했습니다.
- **TypeScript**: 코드의 가독성과 유지 보수성을 높이고, 컴파일 타임에 타입 검사를 통해 버그를 줄이기 위해 사용했습니다.
- **MongoDB & Mongoose**: NoSQL 기반의 데이터베이스로 대용량 데이터 처리와 확장성을 고려하여 선택했습니다. Mongoose는 MongoDB를 더 쉽게 사용하기 위해 선택하였습니다.
- **Redux Toolkit**: 상태 관리를 효율적으로 하기 위해 사용하였으며, 응용 프로그램의 복잡성을 줄여 구조화된 상태 관리를 가능케 합니다.
- **RTK Query**: Redux Toolkit의 일부로, 서버 상태와 캐시 관리를 간소화하며 API 호출을 쉽게 만들어줍니다. 이를 통해 개발자는 네트워크 요청과 데이터 관리에 대한 부담을 줄일 수 있습니다.
- **Axios**: RESTful API 통신을 위해 사용하였고, 쉽게 요청과 응답을 처리할 수 있는 기능을 제공하여 개발에 편리함을 줍니다.
- **react-hook-form**: 비제어 컴포넌트의 장점은 그대로 살리면서 제어 컴포넌트에서만 다룰 수 있는 실시간 유효성 검사, 실시간 동기화 등의 API를 제공하여 실시간 유효성 검사 및 동기화를 가능하게 해줍니다.

<details>
<summary>선택한 라이브러리의 장단점</summary>
<div markdown="1">      
 
**Next.js**
- 장점: 서버사이드 렌더링(SSR)을 지원하여 초기 로딩 속도가 빠르고 검색 엔진 최적화(SEO)에 용이합니다.
- 단점: 설정 및 빌드 과정이 복잡할 수 있습니다.

**TypeScript**

- 장점: 코드의 가독성과 안정성을 높여주며, 이로 인한 버그 예방 효과가 큽니다.
- 단점; 기존의 JavaScript 코드보다 코드 작성 시간이 더 많이 소요될 수 있습니다.

**MongoDB & Mongoose**

- 장점: 스키마가 없어 데이터 구조 변경이 용이하며, 대용량 데이터 처리와 확장성이 가장 큰 장점입니다.
- 단점: 몇몇 쿼리 및 기능들은 SQL 데이터베이스보다 성능이 떨어질 수 있습니다.

**Redux Toolkit**

- 장점: 응용 프로그램의 복잡성을 줄여 구조화된 상태 관리를 가능케 하며, 다양한 미들웨어 및 도구를 사용할 수 있습니다.
- 단점: 초기 러닝 커브가 높고, 작은 규모의 프로젝트에서는 사용이 부적합 할 수 있습니다.

**Axios**

- 장점: 쉽게 요청과 응답을 처리할 수 있으며, 서버와의 통신을 하는 데 있어 효율적입니다.
- 단점: 불필요한 리소스가 증가할 수 있으며, HTTP 인터셉터가 없습니다.

**react-hook-form**

- 장점:
  1. 리렌더링을 최소화시켜 마운팅 속도를 높여줍니다.
  2. 간결한 API를 제공하여 코드를 깔끔하게 작성할 수 있습니다.
  3. 쉬운 유효성 검사

</div>
</details>

## 🎈 구현 기능

- 로그인 및 회원가입
- 영화 상영 시간 생성
- 영화 예매 기능
- 영화 검색 기능
- 영화 목록 기능
- 마이 페이지
- 관리자 페이지
- 권한에 따른 페이지 접속을 가능하게 하는 프로텍트 라우트 구현

## 프로젝트 설명

1. 메인 페이지

- Hero Section에 `TMDB API`를 활용해 최신영화의 예고편을 보여줌
- Hero Section 아래에는 Movie 스키마 등록된 영화 목록이 보여짐
- getStaticProps를 사용하여 초기 로딩 속도 향상(Lighthouse 성능 점수 76 -> 99)

![홈페이지](https://github.com/scs0209/myBlog/assets/110822847/ae8c4d4b-8610-4574-b7d2-767e53399763)

2. 로그인, 회원가입

- `next-auth`를 사용하여 커스텀 로그인과 소셜 미디어 프로바이더를 통한 `소셜 로그인`을 구현
- `react-hook-form`을 사용하여 실시간 유효성 검사 및 불필요한 리렌더링 최소화

로그인

![로그인](https://github.com/scs0209/myBlog/assets/110822847/945568c9-200a-421b-b76a-ebafc40a6aac)

회원가입

![회원가입](https://github.com/scs0209/myBlog/assets/110822847/18301b39-851b-4dd1-a8dc-5635592e8f2f)

3. 인기 영화 조회

- `TMDB API`를 활용하여 영화 데이터를 불러와 인기 영화 조회 기능을 프론트엔드에 구현
- `Intersection Observer API`를 사용하여 인피니트 스크롤 구현

![인기 영화 목록](https://github.com/scs0209/myBlog/assets/110822847/bd628082-ed6d-4520-a480-19ef4f7f33b1)

4. 영화 검색

- `TMDB API`를 활용하여 검색 결과에 해당하는 데이터를 불러와서 화면에 표시
- `Intersection Observer API`를 사용하여 인피니트 스크롤 구현

![영화 검색](https://github.com/scs0209/myBlog/assets/110822847/85d2291e-7918-4746-a98e-69b463374677)

5. 영화 예매 기능

- `아임포트 API`를 활용하여 결제시스템 연동
- 영화, 극장, 상영시간, 좌석 정보를 선택한 후 예매 가능

![예매](https://github.com/scs0209/myBlog/assets/110822847/0d2dc6c4-3721-4188-8e44-1299f9313b46)

6. 마이 페이지 구현

- 마이 페이지에서 내가 예매한 정보 확인 가능
- 예매한 정보 삭제 가능

![마이페이지](https://github.com/scs0209/myBlog/assets/110822847/f3e11ee4-2052-4f91-b35c-f7be8f46a71d)

7. 관리자 페이지 구현

- 해당 웹에 가입한 유저 전체를 볼 수 있고, 삭제할 수 있음

![관리자 페이지](https://github.com/scs0209/myBlog/assets/110822847/5eaf860a-b74e-4b3a-a3b7-953df98af052)

## 📂 디렉토리 구조

<details>
<summary>디렉토리 구조</summary>
<div markdown="1">

```
📦.next
📦node_modules
📦publice
📦src
┣ 📂@types
┃ ┗ 📜mongodb.ts
┣ 📂components
┃ ┣ 📂Admin
┃ ┃ ┣ 📜AdminForm.tsx
┃ ┃ ┣ 📜MovieCreate.tsx
┃ ┃ ┣ 📜StartEndCreate.tsx
┃ ┃ ┗ 📜TheaterNScreenCreate.tsx
┃ ┣ 📂common
┃ ┃ ┣ 📜Button.tsx
┃ ┃ ┣ 📜HeadInfo.tsx
┃ ┃ ┣ 📜Input.tsx
┃ ┃ ┗ 📜Loading.tsx
┃ ┣ 📂Home
┃ ┃ ┣ 📜Hero.tsx
┃ ┃ ┗ 📜SpecialFeature.tsx
┃ ┣ 📂Login
┃ ┃ ┣ 📜LogInForm.tsx
┃ ┃ ┗ 📜SocialBtn.tsx
┃ ┣ 📂Movie
┃ ┃ ┣ 📜MovieCard.tsx
┃ ┃ ┗ 📜MovieList.tsx
┃ ┣ 📂MyPage
┃ ┃ ┗ 📜ReservationTable.tsx
┃ ┣ 📂reservation
┃ ┃ ┣ 📜DateSelector.tsx
┃ ┃ ┣ 📜MovieSelect.tsx
┃ ┃ ┣ 📜ReservationForm.tsx
┃ ┃ ┣ 📜SeatTable.tsx
┃ ┃ ┣ 📜ShowtimeSelect.tsx
┃ ┃ ┗ 📜TheaterSelect.tsx
┃ ┣ 📂Signup
┃ ┃ ┣ 📜InputWithLabel.tsx
┃ ┃ ┗ 📜SignupForm.tsx
┃ ┣ 📜ChangePasswordModal.tsx
┃ ┣ 📜FindPasswordModal.tsx
┃ ┣ 📜Footer.tsx
┃ ┣ 📜Layout.tsx
┃ ┗ 📜Nav.tsx
┣ 📂config
┃ ┗ 📜index.ts
┣ 📂contexts
┃ ┣ 📜AdminContext.tsx
┃ ┣ 📜MyPageContext.tsx
┃ ┗ 📜ReservationContext.tsx
┣ 📂hooks
┃ ┣ 📜useAppSelector.ts
┃ ┣ 📜useFetchData.ts
┃ ┣ 📜useInput.ts
┃ ┗ 📜useModal.ts
┣ 📂models
┃ ┣ 📜Movie.ts
┃ ┣ 📜Reservation.ts
┃ ┣ 📜Screen.ts
┃ ┣ 📜Showtime.ts
┃ ┣ 📜Theater.ts
┃ ┗ 📜User.ts
┣ 📂pages
┃ ┣ 📂api
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┗ 📜[...nextauth].ts
┃ ┃ ┣ 📂movies
┃ ┃ ┃ ┣ 📜movie-detail.ts
┃ ┃ ┃ ┣ 📜movie-search.ts
┃ ┃ ┃ ┣ 📜popular-movie.ts
┃ ┃ ┃ ┗ 📜post-data.ts
┃ ┃ ┣ 📂theater
┃ ┃ ┃ ┗ 📂[id]
┃ ┃ ┃ ┃ ┗ 📜screen.ts
┃ ┃ ┣ 📜change-password.ts
┃ ┃ ┣ 📜find-password.ts
┃ ┃ ┣ 📜reservation.ts
┃ ┃ ┣ 📜showtime.ts
┃ ┃ ┣ 📜theater.ts
┃ ┃ ┗ 📜user.ts
┃ ┣ 📂movies
┃ ┃ ┗ 📜[id].tsx
┃ ┣ 📂my-page
┃ ┃ ┗ 📜[email].tsx
┃ ┣ 📂search-results
┃ ┃ ┗ 📜[query].tsx
┃ ┣ 📜admin.tsx
┃ ┣ 📜index.tsx
┃ ┣ 📜login.tsx
┃ ┣ 📜reservation.tsx
┃ ┣ 📜signup.tsx
┃ ┣ 📜_app.tsx
┃ ┣ 📜_document.tsx
┃ ┗ 📜_error.tsx
┣ 📂redux
┃ ┣ 📂actions
┃ ┃ ┣ 📂movie
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂reservation
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂showtime
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┗ 📂theater
┃ ┃ ┃ ┗ 📜index.ts
┃ ┣ 📂api
┃ ┃ ┣ 📜index.ts
┃ ┃ ┣ 📜reservation.ts
┃ ┃ ┣ 📜showtime.ts
┃ ┃ ┣ 📜theater.ts
┃ ┃ ┗ 📜tmdb.ts
┃ ┣ 📂reducers
┃ ┃ ┣ 📜movieSlice.ts
┃ ┃ ┣ 📜reservationSlice.ts
┃ ┃ ┣ 📜showtimeSlice.ts
┃ ┃ ┗ 📜theaterSlice.ts
┃ ┣ 📂types
┃ ┃ ┣ 📂movie
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┣ 📜movie.ts
┃ ┃ ┃ ┗ 📜state.ts
┃ ┃ ┣ 📂reservation
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┣ 📂showtime
┃ ┃ ┃ ┗ 📜index.ts
┃ ┃ ┗ 📂theater
┃ ┃ ┃ ┗ 📜index.ts
┃ ┗ 📜store.ts
┣ 📂services
┃ ┣ 📜apiServices.ts
┃ ┣ 📜authService.ts
┃ ┣ 📜dbConnect.ts
┃ ┗ 📜mailer.ts
┣ 📂styles
┃ ┣ 📜FindPasswordStyle.tsx
┃ ┣ 📜globals.css
┃ ┣ 📜Home.module.css
┃ ┣ 📜ServiceCardStyle.tsx
┃ ┗ 📜theme.tsx
┗ 📂utils
┃ ┣ 📜fetcher.ts
┃ ┗ 📜payment.ts
┃ pakage.json
┃ ts.config.json
┗ tailwind.config.js
```

</div>
</details>

## ❤ git commit message 컨벤션

| 커밋 유형 | 의미                       |
| --------- | -------------------------- |
| feat      | 새로운 기능 추가           |
| fix       | 버그, 기능 수정            |
| Docs      | 문서 수정                  |
| style     | 스타일 코드 추가           |
| refactor  | 코드 리팩토링              |
| chore     | 기능과 관련 없는 내용 수정 |

---
