const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const hpp = require('hpp');
const helmet = require('helmet');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const hashtagAPIRouter = require('./routes/hashtag');
const config = require('./config/config');

const app = express();

// db 변경 시 일단은 옵션에 force: true로 주면 됨
// 서버 재기동 시 무조건 적용 되기 때문에 일단은 제거함
db.sequelize.sync();

// 패스포트 전략 설정
passportConfig();

if (config.isProd) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: /devfactory\.me$/,
      credentials: true
    })
  );
} else {
  // 어떤 요청이 들어왔는지 로그를 남김
  app.use(morgan('dev'));

  // Access-Control-Allow-Origin 처리
  app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
}

app.use('/', express.static('src/uploads'));

// 세션에 로그인한 사용자 정보 저장
// 프론트에는 세션을 조회 할 수 있는 쿠키를 전달
app.use(cookieParser(config.cookie));
app.use(
  expressSession({
    resave: false, // 매번 세션 강제 저장 여부
    saveUninitialized: false, // 빈 값도 저장 여부
    secret: config.cookie, // 암호화
    cookie: {
      httpOnly: true, // 쿠키를 자바스크립트에서 접근을 하지 못함
      secure: false, // https를 쓸때 true로...
      domain: config.isProd && '.devfactory.me'
    },
    name: 'dbgmltlr'
    // store: RedisStore // store 를 따로 써야 서버가 재시작해도 로그인이 유지됨
  })
);

app.use(passport.initialize());
app.use(passport.session()); // expressSession 다음에 위치해야 함

// req.body 를 사용하기 위해
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/done', (req, res) => {
  res.send('react-node-bird back-end done!!');
});

app.use('/api/users', userAPIRouter);
app.use('/api/posts', postAPIRouter);
app.use('/api/hashtags', hashtagAPIRouter);

app.listen(config.port, () => {
  console.log(`server is running on ${config.port}`);
});
