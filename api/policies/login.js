const getIP = require('ipware')().get_ip;

module.exports = function (req, res, next) {
  // ip白名單
  const allowIP = ['60.251.142.205', '122.116.97.219'];
  const IPinfo = getIP(req, allowIP);
  console.log("IPinfo",IPinfo);
  return next();
  // 白名單才可以登入
  // if (IPinfo.clientIpRoutable) { return next(); }
  // return res.redirect('/');
};
