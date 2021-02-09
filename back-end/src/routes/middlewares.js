exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // 다음 미들웨어로 넘어감
  }
  return res.status(401).json({
    message: '로그인이 필요합니다.'
  });
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({message: '로그인하지 않은 사용자만 접근 가능합니다.'});
};
