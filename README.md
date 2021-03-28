# Standard React NodeBird

### 1. 강의 실습 예제 기반

- [[리뉴얼] React로 NodeBird SNS 만들기](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC# "[리뉴얼] React로 NodeBird SNS 만들기") 참고

### 2. 차이점

- ESLint & Prettier 설정 추가
- EditorConfig 설정 추가

### 3. TODO

- CI/CD 적용
- 리덕스 툴킷 적용
- import 경로 설정
- csurf 확인 및 적용
- 팔로우, 언팔로우 버튼 로딩 처리 (누른 버튼만 로딩이 되게...)
- 팔로우, 팔로워 목록 가지고 올 때 필요한 정보만 가져오기
- 이미지 업로드 파일 수정

### 4. Setting

#### 4-1. front-end

- react

  ```javascript
  npm i react react-dom
  npm i prop-types
  ```

- redux

  ```javascript
  npm i redux react-redux
  npm i redux-devtools-extension
  ```

- redux-saga

  ```javascript
    npm i redux-saga
  ```

- next

  ```javascript
  npm i next
  npm i next-redux-wrapper
  npm i swr
  npm i @next/bundle-analyzer
  ```

- immer

  ```javascript
  npm i immer
  ```

- dayjs

  ```javascript
  npm i dayjs
  ```

- pm2 & cross-env

  ```javascript
  npm i pm2
  npm i cross-env
  ```

- antd & styled-components & babel-plugin-styled-components

  ```javascript
  npm i antd @ant-design/icons
  npm i styled-components
  npm i babel-plugin-styled-components
  ```

- faker & shortid

  ```javascript
  npm i faker shortid
  ```

- eslint & prettier

  ```javascript
  npm i -D eslint
  npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
  npm i -D prettier eslint-config-prettier
  ```

#### 4-2. back-end

- express & express-session

  ```javascript
  npm i express
  npm i express-session
  ```

- bcrypt & cors & cookie-parser & dotenv & morgan & multer

  ```javascript
  npm i bcrypt
  npm i cors
  npm i cookie-parser
  npm i dotenv
  npm i morgan
  npm i multer
  ```

- passport & passport-local

  ```javascript
  npm i passport passport-local
  ```

- sequelize & mysql2

  ```javascript
  npm i sequelize
  npm i mysql2
  npm i -D sequelize-cli
  ```

- pm2 & cross-env & helmet & hpp

  ```javascript
  npm i pm2
  npm i cross-env
  npm i helmet
  npm i hpp
  ```

- sanitize-html & csurf

  ```javascript
  npm i sanitize-html
  npm i csurf
  ```

- multer-s3 & aws-sdk

  ```javascript
  npm i multer-s3
  npm i aws-sdk
  ```

- nodemon

  ```javascript
  npm i -D nodemon
  ```

- eslint & prettier

  ```javascript
  npm i -D eslint
  npm i -D eslint-config-airbnb-base eslint-plugin-import
  npm i -D prettier eslint-config-prettier
  ```

#### 4-2. lambda

- aws-sdk & sharp

  ```javascript
  npm i aws-sdk sharp
  ```

- eslint & prettier

  ```javascript
  npm i -D eslint
  npm i -D eslint-config-airbnb-base eslint-plugin-import
  npm i -D prettier eslint-config-prettier
  ```

#### 4-5. ec2 (nodebird-front, nodebird-back)

- front-end, back-end 는 각각 EC2 (Ubuntu 20.04.LTS)

- 패키지 업데이트
  `sudo apt update && sudo apt upgrade`

- 필요한 패키지 설치  
  `sudo apt install -y build-essential`

- nodejs 설치 (해당 LTS 버전으로, 혹여 별도의 npm 업데이트가 뜬다면 그냥 하지 말자...)
  `curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --`  
  `sudo apt install -y nodejs`

- 소스 다운로드 (.env 파일 직접 옮겨야 함)  
   `sudo git clone https://github.com/mvmaniac/standard-react-nodebird.git /app`

- 패키지 설치 (해당 결로로 이동)
  `sudo npm i --production`

  혹시 npm 업데이트 시 sudo를 꼭 넣어서 실행 할 것
  `sudo npm i -g npm`

- PM2

  - 기본 명령어  
    `sudo npx pm2 list`  
    `sudo npx pm2 monit`
    `sudo npx pm2 show <id|name>`
    `sudo npx pm2 start <id|name>`
    `sudo npx pm2 stop <id|name>`
    `sudo npx pm2 delete <id|name>`
    `sudo npx pm2 restart <id|name>`
    `sudo npx pm2 kill`  
    `sudo npx pm2 reload all`

  - 기동 명령어 (80포트로 띄위기 때문에 sudo를 붙어 주어야 함)

    1. front-end:

       - 기동: `sudo npm run build && sudo npx pm2 start --name nodebird-front npm -- start && sudo npx pm2 monit`
       - 재시작: `sudo npm run build && sudo npx pm2 restart nodebird-front && sudo npx pm2 monit`

    2. back-end
       - 기동: `sudo npm run start && sudo npx pm2 monit`
       - 재시작: `sudo npx pm2 restart nodebird-back && sudo npx pm2 monit`

- HTTPS

  - nginx로 80 이나 443 포트로 접속하면 nginx에서 받아서
    front-end 혹은 back-end 서버로 리버스 프록시 해줌

    1. nginx 설지

       - `sudo apt install -y nginx`

    2. nginx 설정

       - `sudo vi /etc/nginx/nginx.conf`
       - http 속성 안에 server 설정 추가
       - back-end의 경우에만 X-Forwarded-Proto 헤더 설정 추가

         ```conf
         server {
           server_name <도메인 URL>;
           listen 80;
           location / {
             proxy_set_header HOST $host;
             proxy_set_header X-Forwarded-Proto $scheme;
             proxy_pass http://127.0.0.1:<포트번호>;
             proxy_redirect off;
           }
         }
         ```

    3. nginx 시작

       - `sudo systemctl status nginx`
       - `sudo systemctl start nginx`
       - `sudo systemctl restart nginx`
       - `sudo systemctl stop nginx`

    4. 80 포트 확인

       - `sudo lsof -i tcp:80`

    5. https 인증서 설치 및 자동 갱신

       - 한 서버에 하나의 도메인에만 httsp 적용 (2개 이상은..)
       - [certbot instructions for nginx on ubuntu 20.04](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx "certbot instructions for nginx on ubuntu 20.04") 참고

         - `sudo systemctl status snapd` (안 깔려 있다면...)
         - `sudo snap install core; sudo snap refresh core`
         - `sudo snap install --classic certbot`
         - `sudo certbot --nginx` (메일 주소 입력 및 도메인 URL 선택)
         - `sudo certbot renew --dry-run` (갱신 테스트)
         - `sudo certbot renew` (갱신)
         - `sudo certbot certificates` (인증서 정보 확인)

       - nginx.conf 파일에 certbot이 자동으로 입력한 설정 정리 (들어쓰기...)
       - crontab 등록

         - `sudo systemctl status cron`
         - `sudo systemctl restart cron`
         - `sudo crontab -l` (파일 확인)
         - `sudo crontab -e` (파일 편집)
         - `view /var/log/syslog` or `less /var/log/syslog` (로그 확인)
         - 매월 1일 05시 갱신 및 완료 후 nginx 재시작 처리

           ```bash
           0 05 1 * * sudo /usr/bin/certbot renew --renew-hook="sudo systemctl restart nginx"
           ```

#### 4-6. rds (nodebird-db)

- DB는 RDS

- 퍼블릭 액세스 가능은 예로 함 (귀차니즘...)

- 파라미터 변경

  - 'utf8mb4' 설정 파라미터

    ```text
    character_set_client
    character_set_connection
    character_set_database
    character_set_filesystem
    character_set_results
    character_set_server
    ```

  - 'utf8mb4_general_ci' 설정 파라미터

    ```text
    collation_connection
    collation_server
    ```

- DDL & DDL

  ```sql
    CREATE DATABASE nodebird;
    CREATE USER dev@'%' IDENTIFIED BY 'xxxx';
    GRANT ALL PRIVILEGES ON nodebird.* TO dev@'%';
    FLUSH PRIVILEGES;
  ```

#### 4-7. lambda (nodebird-lambda, nodebird-s3)

- 이미지 리사이즈를 위해 쓰는 패키지인 sharp가 Lambda에서 실행이 되려면
  리눅스 같은 곳에 설치된 패키지를 사용해야 함
  만약 그게 아니라면 로컬에 설치된 파일을 직접 업로드해도 될듯?

  1.먼저 Lambda를 생성 한 후 Cloud9 환경을 생성

  2.Cloud9 에디터 상 index.js, package.json 파일만 로컬에서 업로드

  3.Cloud9 터미널에 패키지 설치 후 해당 폴더 자체를 Lambda에 배포

- 다만 Cloud9의 환경과 Lambda 환경이 틀린데도 불구하고 다행히 잘됨...
  Cloud9: Linux2, Node 10
  Lambda: Node 14

### 5. etc

- bundle-analyzer
  Parsed size 기준으로 500KB ~ 1MB 이하로 외부 라이브러리가 크다면 tree shaking으로 검색하여 적용해야 함

- Sequelize를 사용해서 등록일/수정일 사용하는 경우
  [블로그 내용 참고](https://lemontia.tistory.com/873 "블로그 내용 참고")
  > 등록일/수정일을 서버시간이나 DB시간를 보지 않음, timezone 설정으로 하면 됨
