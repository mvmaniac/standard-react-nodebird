const express = require('express');

const postRouter = require('./routes/post');

const app = express();

app.use('/posts', postRouter);

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
