# Standard React NodeBird

### 1. React로 NodeBird SNS 만들기 강의 실습 예제 기반

* [React로 NodeBird SNS 만들기](https://www.inflearn.com/course/react_nodebird "React로 NodeBird SNS 만들기") 참고

### 2. 차이점

* Next.js는 9.x 사용
* ESLint & Prettier 설정 추가
* EditorConfig 설정 추가
* CI/CD 적용(?)

### 3. TODO

* sequelize 공부 (JPA와 비교하여...)
* react-slick UI 변경
* 해시태크 검색 시 리트윗 글도 나오도록 수정
* `db.Post.findOne`으로 게시글 체크 중복코드를 미들웨어로 적용
* loadUserPostsAPI 에도 인피니트스크롤링 적용
* https 적용
* MySQL 8.x 변경

### 4. Setting

#### 4-1. front-end

* react

    ``` javascript
    npm i react react-dom
    npm i prop-types
    npm i react-redux redux-devtools-extension
    ```

* redux

    ``` javascript
    npm i redux react-redux redux-saga
    ```

* next

    ``` javascript
    npm i next
    npm i next-redux-wrapper
    npm i next-redux-saga
    npm i -D @next/bundle-analyzer
    ```

* express

    ``` javascript
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

* pm2
  
    ``` javascript
    npm i pm2
    ```

* cross-env
  
    ``` javascript
    npm i cross-env
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

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    npm i -D babel-eslint
    ```

* nodemon

    ``` javascript
    npm i -D nodemon
    ```

* webpack & plugins

    ``` javascript
    npm i -D webpack
    npm i -D compression-webpack-plugin
    ```

* babel

    ``` javascript
    npm i -D @babel/plugin-proposal-nullish-coalescing-operator
    npm i -D @babel/plugin-proposal-optional-chaining
    npm i -D babel-plugin-styled-components
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
    npm i sequelize
    ```

* axios

    ``` javascript
    npm i axios
    ```

* pm2
  
    ``` javascript
    npm i pm2
    ```

* cross-env
  
    ``` javascript
    npm i cross-env
    ```

* mysql2

    ``` javascript
    npm i mysql2
    ```

* aws-sdk & S3

    ``` javascript
    npm i aws-sdk multer-s3
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb-base eslint-plugin-import
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

* nodemon

    ``` javascript
    npm i -D nodemon
    ```

#### 4-3. lambda

* aws-sdk & sharp

    ``` javascript
    npm i aws-sdk sharp
    ```

* eslint & prettier

    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb-base eslint-plugin-import
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

#### 4-4. db

* ddl & dcl
  
  ```sql
    CREATE DATABASE nodebird;
    CREATE USER dev@'%' IDENTIFIED BY 'xxxx';
    GRANT ALL PRIVILEGES ON nodebird.* TO dev@'%';
    FLUSH PRIVILEGES;
  ```

#### 4-5. server

* front-end, back-end 는 각각 EC2, DB는 RDS
* 원활한 진행을 위해 관리자 권한으로 작업 아니면 ```sudo``` 붙여서 명령어 실행  
  ```sudo su -```

* 필요한 패키지 설치  
    amazon-linux  
    ```amazon-linux-extras install -y **epel**```  
    ```yum install -y git```  
    or  
    ```yum groupinstall 'Development Tools'```

    ubuntu  
    ```apt-get install -y build-essential```

* nodejs 설치 (LTS 버전으로)  
    amazon-linux  
    ```curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash --```  
    ```yum install -y nodejs```

    ubuntu  
    ```curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash --```  
    ```apt-get install -y nodejs```

* 소스 다운로드 (.env 파일 직접 옮겨야 함)  
    ```git clone https://github.com/mvmaniac/standard-react-nodebird.git /app```

* PM2 설치 (명령어를 전역으로 쓰는 용도임)  
    ```npm i -g pm2```

#### 4-6. aws

* EC2  
보안그룹 명칭은 'react-node-bird-server', 인바운드 규칙은 80, 22, 433  
외부접속은 내 IP만 가능하게 할 수 있음

* Route 53  
탄력적 IP는 비용이 발생하므로 번거롭지만 EC2 IP가 변경 될 때마다 IP 설정 필요  
유료 도메인 구매 후 해당 사이트에서 AWS 에서 제공한 DNS로 변경해야함  
변경 후 다시 AWS 에서 EC2 연결하고 해당 도메인으로 접속하는데 최초는 오래 걸리는 듯? (2 ~ 3일?)  
아니면 상황에 따라 다를 수 있음.

* RDS (MySQL 5.x)  
중지 시켜도 비용이 발생하므로 안쓰면 삭제 해야 함  
퍼블릭 액세스 가능성을 '예'  
보안그룹 명칭은 'react-node-bird-db', 인바운드 규칙은 3306  
파라미터 그룹 명칭은 'react-node-bird', 아래 처럼 파라미터 변경

    아래 목록은 'utf8mb4'  
    character_set_client  
    character_set_connection  
    character_set_database  
    character_set_filesystem  
    character_set_results  
    character_set_server  
  
    아래 목록은 'utf8mb4_general_ci'  
    collation_connection  
    collation_server  

* S3  
버킷정책을 퍼블릭으로 함

    ``` javascript
    {
        "Version": "2012-10-17",
        "Id": "PolicyXXXXXXXXXXXXXX",
        "Statement": [
            {
                "Sid": "StmtXXXXXXXXXXXXXX",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject",
                    "s3:PutObject"
                ],
                "Resource": "arn:aws:s3:::S3명칭/*"
            }
        ]
    }
    ```

* Lambda & Cloud9  
람다 배포는 Cloud9 를 통해서 올림

### 5. etc

* next & express
front-end 에서 next와 express를 연결한 이유는 주소를 동적으로 생성하기 위해서  
예를 들어 해쉬태그 링크를 눌렀을 떄 동적으로 페이지를 가져오기 위해서(?)

* .env
.env 파일을 만들어서 사용하는 환경변수가 있으므로, 해당 파일을 만들어서 설정 필요 (해당 파일은 저장소에 올리면 안됨)  
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

* pm2  
  * 기본 명령어  
    ```pm2 list```  
    ```pm2 monit```  
    ```pm2 kill```  
    ```pm2 reload all```  

  * 기동 명령어  
    init: ```npm run start && pm2 monit```  
    front-end: ```npm run build && pm2 reload all && pm2 monit```  
    back-end: ```pm2 reload all && pm2 monit```

* Sequelize를 사용해서 등록일/수정일 사용하는 경우  
[블로그 내용 참고](https://lemontia.tistory.com/873 "블로그 내용 참고")  
    > 등록일/수정일을 서버시간이나 DB시간를 보지 않음, timezone 설정으로 하면 됨  
    > 조회 할 때도 timezone 설정으로 가지고 오지 않음, dialectOptions 으로 시간을 String으로 변환  
    > 한 마디로 저장할 때는 timezone을 적용하도록 옵션을 유지하되, 조회 할 때 날짜를 String 형태로 받음  
