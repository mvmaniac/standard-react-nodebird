# Standard React NodeBird

### 1. React로 NodeBird SNS 만들기 강의의 실습 예제 기반

* [React로 NodeBird SNS 만들기](https://www.inflearn.com/course/react_nodebird "React로 NodeBird SNS 만들기") 참고

### 2. 차이점

* next는 9.x 사용
* eslint & prettier 설정 추가

### 3. TODO

* sequelize 공부 (JPA와 비교하여...)

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

* antd

    ``` javascript
    npm i antd
    ```

* axios

    ``` javascript
    npm i axios
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
