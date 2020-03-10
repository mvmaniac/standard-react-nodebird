const path = require('path');
const next = require('next');
const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const port = dev ? 3060 : process.env.PORT;

const app = next({dev});
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));

  server.use('/', express.static(path.join(__dirname, 'public')));

  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: '',
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );

  server.use(express.json());
  server.use(
    express.urlencoded({
      extended: true
    })
  );

  server.get('/hashtags/:tag', (req, res) => {
    return app.render(req, res, '/hashtag', {tag: req.params.tag});
  });

  server.get('/users/:id', (req, res) => {
    return app.render(req, res, '/user', {userId: req.params.id});
  });

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/post', {postId: req.params.id});
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`next + express running on port ${port}`);
  });
});
