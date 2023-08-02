# FilmFinder

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/235289858-a8950f96-5c58-42f9-8a56-5abc50c541af.png" width="300">
</div>

## 프로젝트 소개

FilmFinder는 React와 TypeScript, Redux Toolkit을 사용하여 영화 검색 기능 및 예매 기능을 구현한 프론트엔드 웹 애플리케이션입니다. TMDB API를 사용하여 검색한 영화 정보를 가져와 보여주고, 사용자가 영화를 클릭하면 해당 영화에 대한 상세 정보와 예매를 할 수 있습니다.

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
- Data Fetching: <img src="https://img.shields.io/badge/SWR-4EA8DE?logoColor=white" style="vertical-align: middle">
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

- Next.js: 서버 사이드 렌더링(SSR)을 지원하여 검색 엔진 최적화(SEO)를 개선하고 초기 로딩 속도를 높이기 위해 사용했습니다.
- TypeScript: 코드의 가독성과 유지 보수성을 높이고, 컴파일 타임에 타입 검사를 통해 버그를 줄이기 위해 사용했습니다.
- MongoDB & Mongoose: NoSQL 기반의 데이터베이스로 대용량 데이터 처리와 확장성을 고려하여 선택했습니다. Mongoose는 MongoDB를 더 쉽게 사용하기 위해 선택하였습니다.
- Redux Toolkit: 상태 관리를 효율적으로 하기 위해 사용하였으며, 응용 프로그램의 복잡성을 줄여 구조화된 상태 관리를 가능케 합니다.
- Axios: RESTful API 통신을 위해 사용하였고, 쉽게 요청과 응답을 처리할 수 있는 기능을 제공하여 개발에 편리함을 주기 때문입니다.

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
</div>
</details>

## 🎈 구현 기능

- 로그인 및 회원가입
- 영화 상영 시간 생성
- 영화 예매 기능
- 영화 검색 기능
- 영화 목록 기능

## ✏ 프로젝트에서 Redux Toolkit과 Context API 사용하기

이 프로젝트에서는 Redux Toolkit과 Context API를 사용하여 다양한 목적으로 애플리케이션 상태를 관리합니다. 각 기술을 사용하게 된 이유와 용도는 다음과 같습니다.

### Redux Toolkit

Redux Toolkit은 네트워크 요청 생성, 데이터 캐싱 및 전역 상태 관리 과정을 단순화하는 데 도움이 됩니다.

여기서는:

- 서버 API에서 데이터를 가져와 전역 상태에 관리하기
- 가져온 데이터와 관련된 상태를 중앙 집중식으로 저장하기
- 액션 생성자, 리듀서 및 저장소 구성과 같은 Redux 관련 코드를 캡슐화하기

Redux Toolkit은 애플리케이션 전반에 걸쳐 여러 구성 요소에서 사용되는 데이터를 관리하기에 이상적이며, React의 로컬 상태나 Context API보다 확장성이 높은 해결책을 제공합니다.

### Context API

반면에, Context API는 React에 내장된 경량 솔루션으로, 특정 부분 또는 구성 요소 내에서 상태를 보다 지역적으로 공유하고 관리해야 할 때 적합합니다.

여기서는:

- 예약 프로세스에서 관련 상태 및 작업 관리하기
- 예약 흐름 구성 요소 내에서 데이터와 액션을 공유하면서 여러 수준의 구성 요소 계층(structure)를 통과하지 않도록 하기(컴포넌트 drilling 방지)

Context API를 사용하여 더 지역적인 상태 관리를 수행하면, 관심사 분리를 더 잘 달성할 수 있으며, 특정 범위의 애플리케이션에서만 관련이 있는 데이터로 전역 상태를 복잡하게 만드는 것을 방지할 수 있습니다.

결론적으로, Redux Toolkit과 Context API 사용으로 효율적으로 상태 관리를 할 수 있습니다.
Redux Toolkit은 전역 상태를 위해 사용되고, Context API는 프로젝트의 특정 영역에 대한 지역적인 상태 관리르 위해 사용됩니다.

<details>
<summary>Redux Toolkit을 사용하면서 알게 된 점</summary>
<div markdown="1">      
 
Redux Toolkit은 다양한 유틸리티와 미들웨어를 포함하고 있어, 다음과 같은 부분에서 이점을 얻을 수 있습니다.
- 불변성의 유지가 간단한 immer를 통해 적용할 수 있습니다.
- Thunk 미들웨어를 사용하여 비동기 작업을 쉽게 처리할 수 있습니다.
- 코드 중복을 줄이고 읽기 쉬운 리듀서를 작성할 수 있습니다.

**Redux Toolkit의 createReducer API는 내부적으로 자동으로 immer를 사용합니다. 따라서 createReducer에 전달되는 모든 리듀서 함수 내부에서 상태를 `변경`하는 것이 이미 안전합니다.**<br>
**createSlice는 내부에서 createReducer를 사용하므로 상태를 `변경`하는 것도 안전합니다.**

</div>
</details>

<details>
<summary>Context API를 사용하면서 알게 된 점</summary>
<div markdown="1">      
 
Context API는 전역 상태 대신 지역 상태를 컴포넌트 계층에 걸쳐 공유할 때 높은 편리성을 제공합니다.
- 간단한 상태 관리를 위해 별도의 라이브러리가 필요하지 않습니다.
- 상태와 상태 관리 함수를 컴포넌트 계층 구조를 통과하지 않고 전달할 수 있습니다.

</div>
</details>

### 사용시 주의할 점

- Redux Toolkit: 애플리케이션 성능에 영향을 줄 수 있는 잦은 상태 업데이트를 피해야 합니다.
- Context API: 전역 상태 관리 대신 오직 지역 상태 관리에만 사용해야 하며, 비효율적인 리렌더링이 발생할 수 있으므로 성능 최적화를 고려해야 합니다.

## 🤔 Movie 스키마 생성안하고 TMDB API 사용한 이유

- 실시간 데이터: TMDB API를 사용하면 항상 최신 상태의 영화 데이터를 얻을 수 있습니다. 즉, 데이터가 변경되거나 업데이트되어도 자동으로 적용되므로, 전체 데이터베이스를 추적하고 계속 업데이트하려는 관리 부담을 줄일 수 있습니다.
- 낮은 저장 비용: 영화 데이터를 별도로 저장하지 않아 데이터 저장 비용이 절약됩니다. 따라서 프로젝트의 인프라 비용을 낮출 수 있습니다.
- 유지 보수 용이성: TMDB API를 통해 영화 관련 정보를 얻을 경우, 자체 데이터베이스를 관리한는 경우에 대비해 데이터 정합성을 지속적으로 확인하는 등의 복잡한 과정이 없기 때문에 유지 보수가 훨씬 간편합니다.
- 코드 효율성: 영화 데이터를 자체 서버에 저장하지 않고 API 호출을 통해 데이터를 요청하는 것은 코드의 복잡성을 줄이고 시스템 자원에 대한 요구 사항도 감소시킵니다. 이를 통해 전반적인 코드 효율성이 향상됩니다.

그러나, TMDB API만 사용하는 경우 서비스 가용성에 영향을 받게 됩니다. API가 변경되거나 유지 보수 중일 경우 프로젝트에서 영화 정보를 가져오는 데 문제가 발생할 수 있습니다. 또한, API 사용량 및 호출 제한에 따라 개발상의 규제의 여지가 있으며, 높은 주기로 정보를 요청할 경우 문제가 발생할 수 있습니다. 따라서, 프로젝트 요구 사항에 따라 어떤 방식이 최선인지 고안을 해야합니다.

## ⚙ 리팩토링

<details>
<summary>API 호출 중앙화</summary>
<div markdown="1">      
 
코드를 리팩토링하여 여러 API 호출 함수들을 별도의 api 폴더에 저장한 이유와 그 장점은 다음과 같습니다.

1. 모듈화: API 호출을 별도의 파일로 분리함으로써 코드의 모듈성이 향상되고, 이를 통해 각 함수는 특정 목적에 충실한 역할을 수행하게 되고, 코드를 더 쉽게 관리할 수 있습니다.

2. 재사용성: API 호출 함수를 별도의 파일로 분리하면 다른 구성 요소 또는 파일에서 쉽게 재사용할 수 있습니다. 이렇게 하면, 필요한 경우 다른 파일에서도 같은 API 호출을 쉽게 사용할 수 있습니다.

3. 유지 보수: 향후 API 호출과 관련된 변경 사항이 발생하는 경우 이제 한 곳에서만 변경을 수행하면 됩니다. 이는 코드의 유지 보수를 더 쉽게 만들어줍니다.

4. 가독성: API 호출 함수를 별도의 파일로 저장하면, 해당 로직을 실제 사용하는 부분에서는 이제 간단한 호출로 처리할 수 있으므로 코드가 더 간결해집니다. 이는 전체적인 코드 가독성을 높여주며, 코드를 이해하기가 더 쉬워집니다.

5. 디버깅 용이성: 각 API 호출 함수가 별도의 파일에 분리되어 있다면 오류 발생 시 문제를 추적하기가 더 쉬워집니다. 이 세분화된 구조는 디버깅 시간을 최소화하며 건강한 코드 구조를 형성하는데 도움이 됩니다.

6. Interceptors 적용: axios 인스턴스에 response.interceptors를 적용한 것으로, 이를 통해 API 호출에 대한 일관된 오류 처리를 구현할 수 있습니다. 오류 발생 시 통일된 처리 방식을 적용하며, 복잡도를 줄이고 코드의 가독성을 높입니다.

</div>
</details>

## 추가 기능

<details>
<summary>Infinite Scroll</summary>
<div markdown="1">

> Intersection Observer API를 사용하여 Infinite Scroll을 SearchResults 컴포넌트와 PopularMoviePage에 적용하였습니다.

### 인피니트 스크롤을 구현하면서 어려웠던 점

1. 기존 데이터 유지: 페이질를 나갔다 들어와도 이전에 로드한 데이터가 유지되도록 하는 것이 중요한 고려사항이였습니다.
2. 성능 최적화: 인피니트 스크롤을 사용할 때, 사용자가 무한히 스크롤하면서 새로운 데이터를 로드하면 성능이 저하될 수 있습니다. 따라서 데이터를 적절하게 관리하고 필요한 시점에서만 렌더링하는 것이 중요합니다.

### 인피니트 스크롤 구현 과정에서 시도하고 배운 점

- Intersection Observer API 사용: 브라우저가 특정 요소와 상호작용 할 때, 이를 감지할 수 있는 API로 인피니트 스크롤 구현에 적합하다.
- 상태관리 고려: 페이지 상태를 기억하여 페이지 이동 시 적절한 위치에서부터 로드할 수 있도록 고려해야 했습니다.(Redux Toolkit 사용)
- 올바른 적재 기준 설정: 언제 새로운 데이터를 불러올 것인지 결정하는 것이 중요했습니다.(예: 스크롤 위치, 구성 요소 가시성 등)

### Intersection Observer API의 장점

- 성능 향상: 이벤트 리스너를 사용하면 스크롤 이벤트가 자주 발생하고 성능상의 문제가 발생할 수 있으나, Intersection Observer는 비동기적으로 작동하여 성능 최적화가 가능합니다.
- 동적인 환경에 적합: 여러 개의 요소를 감시하거나 화면 크기가 변경될 때 감시 영역을 자도응로 조정하는 등 유연성이 높습니다.
- 다양한 용도로 사용 가능: 인피니트 스크롤 외에도 lazy 이미지 로딩, 애니메이션 효과 등 다양한 작업에 사용할 수 있습니다.

### 페이지네이션 대비 인피니트 스크롤 장점

- 사용자 경험 개선: 인피니트 스크롤은 사용자가 무한히 스크롤을 내리면서 계속된 콘텐츠를 탐색할 수 있어 사용자에게 좋은 경험을 제공합니다.
- 더 빠른 로딩 속도: 인피니트 스크롤은 필요 시 새로운 데이터를 로드하므로 한 번에 모든 데이터를 로드하는 것보다 로딩 속도가 빠릅니다.
- 자연스러운 사용 패턴: 페이지네이션보다 스마트폰과 태블릿 같은 터치 기반 환경에서 스크롤이 더 자연스럽게 느껴집니다.

### PopularMoviePage 컴포넌트에서의 인피니트 스크롤 문제

#### useState를 사용하여 페이지 상태 관리 시 발생하는 문제점

- 리셋 문제: 페이지를 벗어났다가 다시 돌아올 때, 컴포넌트가 다시 마운트되며, 초기 상태로 리셋되는 문제가 있었습니다.

**Redux Toolkit를 사용하여 전역 상태로 페이지를 기억하게 해 해결**

- 전역 상태 정의: Redux Toolkit을 사용하여 애플리케이션 전체에서 접근 간능한 페이지 상태를 정의했습니다. 이를 통해 컴포넌트 간 상태 공유가 가능해졌습니다.
- 최신 페이지 상태 로드: Redux Toolkit을 사용하면 상태 변화가 저장되어, 외부에서도 페이지 상태를 기억할 수 있고, 이전에 로드한 데이터를 유지 가능합니다.
- 최적화된 렌더링과 업데이트: Redux Toolkit을 통해 페이지 상태가 변경될 때 필요한 컴포넌트만 렌더링하여 성능 최적화를 할 수 있습니다.

### SearchResults 컴포넌트에서의 인피니트 스크롤 문제

- 검색 결과 중복 문제: 처음 검색 기능이 실행된 후, 이미 있는 검색 결과에 중복되는 내용이 추가되는 문제가 있었습니다. 이 문제를 해결하기 위해 다음과 같은 방법을 사용했습니다.

로컬 상태를 사용한 초기 검색 시 상태 리셋 SearchResults.tsx 컴포넌트에서 로컬 상태인 page에 시작 검색(query 변경 시)을 할 때마다 상태를 1로 리셋하도록 수정했습니다. 이를 통해 새로운 검색이 시작될 때마다 원래 페이지를 초기 상태로 돌리는 역할을 하도록 함으로써 중복 결과가 표시되지 않게 됩니다.

```typescript
useEffect(() => {
  if (query?.query) {
    const queryStr = Array.isArray(query.query) ? query.query[0] : query.query
    setPage(1) // 초기 검색 시 페이지 상태를 1로 리셋
    dispatch(searchMovies({ query: queryStr, page: 1 }))
  }
}, [query, dispatch])
```

이렇게 설정하면 사용자가 새로운 검색어를 입력할 때마다 로컬 상태의 페이지가 1로 초기화되어 중복되는 검색 결과를 방지할 수 있습니다. 새로운 요청 결과를 기존의 결과와 함께 병합하기 전에 초기화하는 것이 중요한 점입니다.

</div>
</details>

## 🤞 프로젝트하면서 깨달은 점

영화 데이터를 실시간으로 유지하는 것이 중요하기 때문에 TMDB API 등 외부 API를 활용하면 업데이트된 정보를 사용자에게 제공하는데 도움이 됨을 깨달았습니다. 사용자의 기기, 환경에 따라 다른 화면 크기와 해상도를 고려한 반응형 디자인이 중요하다는 것을 알게 되었습니다. 중복 데이터 처리와 에러 처리를 통해 안정적인 기능 구현이 가능함을 이해하였습니다.

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
