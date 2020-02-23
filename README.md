# Standard React NodeBird

### 1. React로 NodeBird SNS 만들기 강의의 실습 예제 기반

* [React로 NodeBird SNS 만들기](https://www.inflearn.com/course/react_nodebird "React로 NodeBird SNS 만들기") 참고

### 2. 차이점

* next는 9.x 사용
* eslint & prettier 설정 추가

### 3. TODO

* sequelize 공부 (JPA와 비교하여...)
* 새로고침 시 로그인한 사용자 수 정보 수정 (트윗, 팔로링, 팔로워 수)
* react-slick UI 변경
* 해시태크 검색 시 리트윗 글도 나오도록 수정

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

* webpack

    ``` javascript
    npm i -D webpack
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
