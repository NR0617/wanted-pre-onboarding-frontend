## 프로젝트 소개 - To do List 만들기

- 지원자 : 오나래
- 배포 링크 : https://wanted-pre-onboarding-frontend-psi-beige.vercel.app/

## 진행기간

2023.08.02 ~ 2023.08.07

## 사용한 기술

React, Axios, Styled-components, Javascript, react-router

## 프로젝트의 실행 방법

```
  1. 터미널을 열고 git clone https://github.com/NR0617/wanted-pre-onboarding-frontend.git 을 입력
  2. 프로젝트 폴더로 이동 e.g. cd wanted-pre-onboarding-frontend
  3. npm install
  4. npm start
```

## 파일 구조

```
📦
├─ .env
├─ .gitignore
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
└─ src
   ├─ App.css
   ├─ App.js
   ├─ App.test.js
   ├─ components
   │  ├─ Header.js
   │  └─ ListItem.js
   ├─ constant
   │  └─ errorMessage.js
   ├─ index.css
   ├─ index.js
   ├─ pages
   │  ├─ ErrorPage.js
   │  ├─ SignIn.js
   │  ├─ SignUp.js
   │  └─ TodoList.js
   └─ utils
      ├─ api.js
      └─ validate.js
```

## 프로젝트 설명

### 로그인과 회원가입

- 로그인과 회원가입 페이지에서 공유하는 유효성 검증 함수를 utils 폴더에 제작하여 사용

```javascript
// utils/validate.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
};
export const validatePassword = (password) => {
  return password.length >= 8;
};
```

- 로그인과 회원가입에서 같이 사용하는 에러메세지를 constant로 관리하여 오타가 발생할 가능성을 줄임

```javascript
// constant/errorMessage
export const EMAIL_ERROR_MESSAGE = "유효한 이메일을 입력해주세요";
export const PASSWORD_ERROR_MESSAGE = "비밀번호는 8자 이상 입력해주세요";
export const UNVALIDATED_PASSWORD_OR_EMAIL =
  "아이디 또는 비밀번호가 잘못되었습니다";
```

- 토큰은 로컬스토리지에서 관리

```javascript
const handleSubmit = async () => {
  if (validateEmail(email) && validatePassword(password)) {
    const response = await signinApi(email, password);
    if (response.status === 200) {
      setEmail("");
      setPassword("");
      setIsDisabled(true);
      localStorage.setItem("JWT", response.data.access_token);
      alert("로그인 되었습니다");
      navigate("/todo");
    } else {
      alert(response.data.message);
    }
  } else {
    alert(UNVALIDATED_PASSWORD_OR_EMAIL);
  }
};
```

### CRUD

- Create : 서버 응답의 상태코드가 성공이면 프론트엔드의 ListItem에 추가

```javascript
const handleCreateTodo = () => {
  createTodoApi(token, todoInputData)
    .then((res) => {
      if (res.status === 201) {
        setData((prev) => [...prev, res.data]);
        setTodoInputData("");
      } else {
        throw new Error();
      }
    })
    .catch((err) => console.log(err));
};
```

- Read: localStorage에 토큰이 있으면 /todo에서 서버에서 응답으로 받아온 데이터를 map메서드로 보여줌

- Update : 아이템의 내용을 수정하는 함수는 ListItem 컴포넌트에서 관리할 수 있게 제작
  e.g. handleCheckbox, handleModifyInputData, handleUpdateTodo

- Delete : 아이템 리스트의 추가, 삭제를 담당하는 함수이므로 Create와 함께 TodoList 컴포넌트에서 제작. 서버 응답의 상태코드가 성공이면 filter로 아이템을 제거

```javascript
const deleteListItem = (id) => {
  setData((prevData) => prevData.filter((el) => el.id !== id));
};
```

### Redirect

- "/" 경로로 접근할 경우 "/todo"로 이동
- react-router에 없는 경로로 접근할 경우 errorPage로 이동
- "/todo"로 접근했을 때 토큰이 없으면 로그인 페이지로 이동

```javascript
const navigate = useNavigate();
const token = localStorage.getItem("JWT");
useEffect(() => {
  if (!token) {
    navigate("/signin");
  }
}, [token]);
```

- 로그인 페이지, 회원가입 페이지에서 토큰이 있으면 "/todo"로 이동

```javascript
const navigate = useNavigate();
const token = localStorage.getItem("JWT");

useEffect(() => {
  if (!!token) {
    navigate("/todo");
  }
}, []);
```
