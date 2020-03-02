# Standard React NodeBird

### 1. React로 NodeBird SNS 만들기 강의의 실습 예제 기반

* [React로 NodeBird SNS 만들기](https://www.inflearn.com/course/react_nodebird "React로 NodeBird SNS 만들기") 참고

### 2. 차이점

* Next.js는 9.x 사용
* eslint & prettier 설정 추가
* EditorConfig 설정 추가
* @next/bundle-analyzer 사용

### 3. TODO

* sequelize 공부 (JPA와 비교하여...)
* 새로고침 시 로그인한 사용자 수 정보 수정 (트윗, 팔로링, 팔로워 수)
* react-slick UI 변경
* 해시태크 검색 시 리트윗 글도 나오도록 수정
* `db.Post.findOne`으로 게시글 체크 중복코드를 미들웨어로 적용
* loadUserPostsAPI 에도 인피니트스크롤링 적용

### 4. Setting

#### 4-1. front-end

* react

    ``` javascript
    npm i react react-dom
    npm i prop-types
    ```

* redux

    ``` javascript
    npm i redux react-redux redux-saga
    ```

* next

    ``` **javascript**
    npm i next
    npm i next-redux-wrapper
    npm i next-redux-saga
    ```

* express

    ``` **javascript**
    npm i express
    npm i cookie-parser
    npm i express-session
    npm i dotenv
    npm i morgan
    ```

* antd

    ``` javascript
    npm i antd
    ```

* axios

    ``` javascript
    npm i axios
    ```

* react-slick
  
    ``` javascript
    npm i react-slick
    ```

* react-helmet
  
    ``` javascript
    npm i react-helmet
    ```

* immer
  
    ``` javascript
    npm i immer

    ```

* styled-components
  
    ``` javascript
    npm i styled-components
    ```

* cross-env
  
    ``` javascript
    npm i cross-env
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
    npm i -D babel-eslint
    npm i -D prettier eslint-config-prettier
    ```

* nodemon

    ``` javascript
    npm i -D nodemon
    ```

* nodemon

    ``` javascript
    npm i @zeit/next-bundle-analyzer
    ```

* webpack & plugins

    ``` javascript
    npm i -D webpack
    npm i -D webpack-bundle-analyzer
    npm i -D compression-webpack-plugin
    ```

#### 4-2. back-end

* express & etc

    ``` javascript
    npm i express
    npm i bcrypt
    npm i cookie-parser
    npm i express-session
    npm i dotenv
    npm i helmet hpp
    npm i morgan
    npm i multer
    npm i passport passport-local
    ```

* sequelize

    ``` javascript
    npm i sequelize sequelize-cli
    ```

* axios

    ``` javascript
    npm i axios
    ```

* mysql2

    ``` javascript
    npm i mysql2
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y
    npm i -D babel-eslint
    npm i -D prettier eslint-config-prettier
    ```

* nodemon

    ``` javascript
    npm i -D nodemon
    ```

#### 4-3. db

* ddl & dcl
  
  ```sql
    CREATE DATABASE nodebird;
    CREATE USER dev@'%' IDENTIFIED BY '1234';
    GRANT ALL PRIVILEGES ON nodebird.* TO dev@'%';
    FLUSH PRIVILEGES;
  ```

#### 4-4. etc

* next & express

  * front-end 에서 next와 express를 연결한 이유는 주소를 동적으로 생성하기 위해서  
    예를 들어 해쉬태그 링크를 눌렀을 떄 동적으로 페이지를 가져오기 위해서(?)

* .env
  
  * .env 파일을 만들어서 사용하는 환경변수가 있으므로, 해당 파일을 만들어서 설정 필요 (해당 파일은 저장소에 올리면 안됨)  
    front-end는 COOKIE_SECRET  
    back-end는 COOKIE_SECRET, DB_PASSWORD  

* containers와 components 폴더의 차이  
containers 폴더에는 redux의 dispatch 하는 부분이 있는 것만  
components 폴더에는 ImageZoom 처럼 화면만 표시하는 것만 넣음

* Next.js Link의 prefetch  
페이지 로딩 시 해당 페이지까지 같이 불러옴(?)  
너무 많이 쓰면은 안되고 사용자가 자주 다니는 페이지들인 경우 사용
근데 Next.js 9 부터는 자동으로 prefetch 되기 떄문에 안 써도 됨

* bundle-analyzer  
Parsed size 기준으로 500KB ~ 1MB 이하로
외부 라이브러리가 크다면 tree shaking으로 검색하여 적용해야 함
