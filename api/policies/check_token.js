const co = require('co');
module.exports = function (req, res, next) {
  //取user ip
  var ff = "::ffff:";
  var client_ip = req.ip;
  var ipv6_client_ip = client_ip.replace(ff,"");
  console.log('[client ip]',client_ip,ipv6_client_ip);
  co(function* () {
    const supportData = yield ajax_service.supportFind({support_pk: req.body.support_pk});
    if ( (req.body.token == undefined) || (supportData[0].token != req.body.token) ) return res.json('you are not permission');
    console.log('check token ok');
    req.body.ip = ipv6_client_ip;
    next();
  })
  .catch(err => res.serverError(err));
};
