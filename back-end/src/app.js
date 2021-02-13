const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

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

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3060',
    credentials: true
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postRouter);
app.use('/users', userRouter);

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
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : '';

  res.status(err.status || 500).send({
    message: err.message,
    stack
  });
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
