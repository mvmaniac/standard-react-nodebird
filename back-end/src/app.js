const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');

const config = require('./config/config');
const {sequelize} = require('./models');
const passportConfig = require('./passport');

passportConfig();

sequelize
  .sync({force: false})
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();

if (config.isProd) {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: /devfactory\.me$/,
      credentials: true
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(config.cookie));
app.use(
  session({
    resave: false, // 매번 세션 강제 저장 여부
    saveUninitialized: false, // 빈 값도 저장 여부
    secret: config.cookie, // 암호화
    proxy: config.isProd, // nginx 앞단에 proxy가 있는 경우에만
    cookie: {
      httpOnly: true, // 쿠키를 자바스크립트에서 접근을 하지 못함
      secure: config.isProd,
      domain: config.isProd && '.devfactory.me'
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('hello express');
});

// 404 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 잘못된 요청 입니다.`);
  error.status = 404;
  next(error); // next 안에 error를 넣어주면 바로 에러 미들웨어 넘어감
});

// 에러 미들웨어
app.use((err, req, res, next) => {
  const stack = config.isProd ? err.stack : '';

  res.status(err.status || 500).send({
    message: err.message,
    stack
  });
});

app.listen(config.httpPort, () => {
  console.log(`server is running...${config.httpPort}`);
});
