/* eslint-disable no-param-reassign */
const md5 = require('md5');
const co = require('co');
const getClienIP = require('ipware')().get_ip;

module.exports = {
    // 登入檢查
  loginCheck(req, res) {
    const getIP = getClienIP(req);
    const reqAccount = req.param('email');
    const reqPasswd = md5(req.param('password'));
    let statusMsg = 'success';
    co(function* () {

      const chkAccount = yield User_service.chkAccount(reqAccount, reqPasswd);
      if (chkAccount === 'err') {
        res.view('login', { errMsg: '資料庫連線失敗!' })
      }
      if (!chkAccount) {
        statusMsg = '帳密錯誤';
        const inputApi = 'login';
        const status = statusMsg;
        const inputData = getIP;
        const who = '';
        const type = '';
        const api_log = yield common_Service.write_log(inputApi, status, inputData, who, type);
        return res.view('login', { errMsg: '帳密錯誤!' });
      }
      req.session.user = chkAccount;
      res.redirect(`/support/list`);

      chkAccount.IP = getIP;
      const inputApi = 'login';
      const status = statusMsg;
      const inputData = chkAccount;
      const who = chkAccount.email;
      const type = '';
      const api_log = yield common_Service.write_log(inputApi, status, inputData, who, type);

    }).catch(err => console.log('err--',err));
  },
  // 登出
  logout(req, res) {
    delete req.session.user;
    return res.redirect('/');
  },
  // 列表頁面 http://localhost:1337/user/list
  change_pass(req, res) {
    const returnObj = {};
    returnObj.nowLink = req.route.path;
    return res.view(false, returnObj);
  },
  // 列表頁面 http://localhost:1337/user/list
  send_change_pass(req, res) {
    const find = {
      customer_pk: req.session.user.customer_pk
    };
    const updata = {
      passwd:  md5(req.param('password'))
    };
    Customer.update(find,updata).exec((err,data) => {
      if (err) return res.json(err);
      console.log("update pass",data);
      delete req.session.user;
      res.redirect("/");
    })
  },
};
