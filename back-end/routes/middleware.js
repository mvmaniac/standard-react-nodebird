exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // 다음 미들웨어로 넘어감
  }
  return res.status(401).send('로그인이 필요합니다.');
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(); 
  }
  return res.status(401).send('로그인인한 사용자는 접근할 수 없습니다.');
};
