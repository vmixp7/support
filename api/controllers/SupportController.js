/**
 * supportController
 *
 * @description :: Server-side logic for managing supports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const co = require('co');
const moment = require('moment');

const listLink = `/support/list/`;
const addLink = `/support/add/`;
const editLink = `/support/edit/`;
const detailLink = `/support/detail/`;
const replyLink = `/support/reply/`;
const viewLink = `/support/viewAll/`;
const submitLink = `/api/support/send_support`;
const uploadLink = `/api/upload/sendS3`;
const sendMail = `/api/sendMail`;
const colsArray = [
  'support_pk',
  'createdAt',
  'nation_name',
  'source',
  'sup_name',
  'sup_email',
  'title',
  'status_name',
  'updatedAt'
  // 'priority',
  // 'sup_tel',
  // 'sup_carrier',
  // 'sup_context',
  // 'buy_address',
  // 'mobile_type',
  // 'model_pk',
  // 'os_mobile',
  // 'os_app',
  // 'version_mobile',
  // 'question_type',
];

module.exports = {
  // 列表頁面 http://localhost:1337/support/list
  support_list(req, res) {
    const returnObj = {};
    returnObj.link_to_add = addLink;
    returnObj.nowLink = req.route.path;
    returnObj.viewLink = viewLink;
    return res.view(false, returnObj);
  },
  // 新增頁面 http://localhost:1337/support/add
  support_add(req, res) {
    co(function* () {
      const returnObj = {};
      const findDevice = yield ajax_service.device_modelFind();
      const deviceArr = yield common_Service.getSelect(findDevice, 'description', 'model_pk');
      const inputCond = {
        select: ['nation_pk', 'nation_name']
      }
      const findNation = yield ajax_service.nationFind(inputCond);
      const nationArr = yield common_Service.getSelect(findNation, 'nation_name', 'nation_pk');
      const findQuest = yield ajax_service.question_typeFind({ status: 'work' });
      const findStatus = yield ajax_service.statusFind();
      const newStatus = common_Service.getSelect(findStatus, 'question_name', 'question_pk');

      returnObj.link_to_upload = uploadLink;
      returnObj.link_to_submit = submitLink;
      returnObj.link_to_list = listLink;
      returnObj.nowLink = req.route.path;
      returnObj.deviceArr = deviceArr;
      returnObj.nationArr = nationArr;
      returnObj.questArr = findQuest;
      returnObj.statusArr = newStatus;
      return res.view(false, returnObj);
    }).catch(err => res.serverError(err));
  },
  // 編輯頁面 http://localhost:1337/support/edit/:id
  support_edit(req, res) {
    co(function* () {
      const params = req.allParams();
      const findData = yield View_support.findOne({ support_pk: params.id }).then(data => data);
      if (!findData) { return res.json('notfound support_pk'); }
      const findDevice = yield ajax_service.device_modelFind();
      const deviceArr = yield common_Service.getSelect(findDevice, 'description', 'model_pk');

      const inputCond = {
        select: ['nation_pk', 'nation_name']
      }
      const findNation = yield ajax_service.nationFind(inputCond);
      const nationArr = yield common_Service.getSelect(findNation, 'nation_name', 'nation_pk');
      const findQuest = yield ajax_service.question_typeFind({ status: 'work' });
      const findStatus = yield ajax_service.statusFind();
      const newStatus = yield common_Service.getSelect(findStatus, 'status_name', 'status_pk');


      // 資料處理
      const returnObj = {};
      returnObj.link_to_upload = uploadLink;
      returnObj.link_to_submit = submitLink;
      returnObj.mail_to_submit = sendMail;
      returnObj.link_to_list = listLink;
      returnObj.deviceArr = deviceArr;
      returnObj.nationArr = nationArr;
      returnObj.questArr = findQuest;
      returnObj.statusArr = newStatus;
      returnObj.nowLink = req.route.path;
      returnObj.findData = findData;
      return res.view(false, returnObj);
    })
      .catch(err => res.serverError(err));
  },
  // 問題詳細內容
  support_detail(req, res) {
    co(function* () {
      const $customer_group = (req.session.user.role == 'admin') ? { "!": "" } : req.session.user.customer_group_pk;
      const params = req.allParams();
      const findData = yield View_support.findOne({ support_pk: params.id }).then(data => data);
      if (!findData) { return res.json('notfound support_detail'); }
      const findReply = yield ajax_service.replyFind({ support_pk: params.id });
      const findDevice = yield ajax_service.device_modelFind();
      const findQuestionType = yield ajax_service.question_typeFind();

      findData.deviceName = [];
      _.map(findDevice, function (val) {
        if (findData.device_model_arr.indexOf(val.model_pk) !== -1) findData.deviceName.push(val.description);
      })
      findData.questionName = [];
      _.map(findQuestionType, function (val) {
        if (findData.question_type_arr.indexOf(val.question_type_pk) !== -1) findData.questionName.push(val.question_name);
      })

      const supportCount = yield View_support.count({ customer_group_pk: $customer_group, select: ['support_pk'] }).then(data => data);
      let nextLink = '下一頁';
      let prevLink = '上一頁';

      if (supportCount != 1) {
        const firstPages = yield View_support.find({ customer_group_pk: $customer_group, select: ['support_pk'] }).limit(1).sort('support_pk ASC').then(data => data);
        const firstPage = firstPages[0].support_pk;
        const lastPages = yield View_support.find({ customer_group_pk: $customer_group, select: ['support_pk'] }).limit(1).sort('support_pk DESC').then(data => data);
        const lastPage = lastPages[0].support_pk;
        // 計算是否有下一頁
        const option1 = {
          customer_group_pk: $customer_group,
          support_pk: { ">": findData.support_pk },
          select: ['support_pk']
        }
        if (findData.support_pk != lastPage) {
          const nexts = yield View_support.find(option1).limit(1).then(data => data);
          const next = nexts[0].support_pk;
          nextLink = `<a href="/support/detail/${next}">下一頁</a> »`;
        }
        // 計算是否有上一頁
        const option2 = {
          customer_group_pk: $customer_group,
          support_pk: { "<": findData.support_pk },
          select: ['support_pk']
        }
        if (findData.support_pk != firstPage) {
          const prevs = yield View_support.find(option2).limit(1).sort("support_pk DESC").then(data => data);
          const prev = prevs[0].support_pk;
          prevLink = `« <a href="/support/detail/${prev}">上一頁</a>`;
        }
      }
      const pageBar = `${prevLink} | ${findData.support_pk} | ${nextLink}`;

      // 資料處理
      const returnObj = {};
      returnObj.moment = moment;
      returnObj.link_to_upload = uploadLink;
      returnObj.link_to_submit = submitLink;
      returnObj.mail_to_submit = sendMail;
      returnObj.link_to_list = listLink;
      returnObj.pageBar = pageBar;
      returnObj.nowLink = req.route.path;
      returnObj.findData = findData;
      returnObj.replyArray = findReply;
      return res.view(false, returnObj);
    })
      .catch(err => res.serverError(err));
  },
  // 問題詳細內容
  user_reply(req, res) {
    co(function* () {
      const params = req.allParams();
      const chkStatus = sails.config.myconf.replyEndStatus; // 狀態為處理完成,作廢就不顯示
      const findData = yield View_support.findOne({ support_pk: params.id }).then(data => data);
      if (!findData) return res.json('notfound support_pk11111111');
      if (findData.token !== params.token) return res.json('你沒有權限瀏覽此頁面');
      if (chkStatus.indexOf(findData.status) != -1) return res.json('此問題已處理完成');

      const findReply = yield ajax_service.replyFind({ support_pk: params.id });
      const findDevice = yield ajax_service.device_modelFind();
      const findQuestionType = yield ajax_service.question_typeFind();

      findData.deviceName = [];
      _.map(findDevice, function (val) {
        if (findData.device_model_arr.indexOf(val.model_pk) !== -1) findData.deviceName.push(val.description);
      })
      findData.questionName = [];
      _.map(findQuestionType, function (val) {
        if (findData.question_type_arr.indexOf(val.question_type_pk) !== -1) findData.questionName.push(val.question_name);
      })

      // 資料處理
      const returnObj = {};
      returnObj.moment = moment;
      returnObj.link_to_upload = uploadLink;
      returnObj.link_to_submit = submitLink;
      returnObj.link_to_list = listLink;
      returnObj.nowLink = req.route.path;
      returnObj.findData = findData;
      returnObj.replyArray = findReply;
      return res.view(false, returnObj);
    })
      .catch(err => res.serverError(err));
  },
  send_all(req, res) {
    co(function* () {
      const params = req.allParams();
      const findData = yield User.find({ status: "work", select: ["account"] }).then(data => data);
      if (!findData) { return res.json('notfound support_pk222'); }

      let accounts = '';
      _.map(findData, function (o) {
        accounts += o.account + ';';
      })

      console.log("accounts", accounts);

      // 資料處理
      const returnObj = {};
      returnObj.link_to_submit = submitLink;
      returnObj.mail_to_submit = sendMail;
      returnObj.link_to_list = listLink;
      returnObj.nowLink = req.route.path;
      returnObj.findData = accounts;
      return res.view(false, returnObj);
    })
      .catch(err => res.serverError(err));
  },
  // ajax撈取全部資料專用
  viewAll(req, res) {
    co(function* () {
      const $customer_group = (req.session.user.role == 'admin') ? { "!": "" } : req.session.user.customer_group_pk;
      const params = req.allParams();
      // 產生右上角用的搜尋條件
      const searchOrCond = _.map(colsArray, (cols) => {
        const returnObj = {};
        returnObj[cols] = {
          contains: req.query.sSearch
        };
        return returnObj;
      });
      // 搜尋用的waterline
      const options = {
        where: {
          customer_group_pk: $customer_group,
          or: searchOrCond
        },
        sort: `${colsArray[params.iSortCol_0]} ${params.sSortDir_0}`
      };
      const options2 = _.clone(options);
      options2.skip = params.iDisplayStart;
      options2.limit = params.iDisplayLength;
      const countAll = yield ajax_service.supportAjaxCount({ customer_group_pk: $customer_group });
      const countDisplay = yield ajax_service.supportAjaxCount(options);
      const findData = yield ajax_service.supportFind(options2);

      // 製作 前端產生結果
      const retsupport = [];
      for (let i = 0; i < findData.length; i += 1) {
        const oneData = findData[i];
        const pushObj = {};
        _.each(colsArray, (cols) => {
          pushObj[cols] = oneData[cols] || '';
        });

        pushObj.updatedAt = moment(oneData.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        pushObj.createdAt = moment(oneData.createdAt).format('YYYY-MM-DD HH:mm:ss');
        pushObj.title = `<a href="${detailLink}${oneData.support_pk}">${oneData.title}</a>`;
        const modifyUrl = `${editLink}${oneData.support_pk}`;
        pushObj.finalModify = `<a href='${modifyUrl}'>${sails.__({ phrase: 'modify', locale: sails.config.myconf.lang[0] })}</a>`;
        retsupport.push(pushObj);
      }
      const json = {
        aaData: retsupport,
        iTotalRecords: countAll,
        iTotalDisplayRecords: countDisplay
      };

      res.contentType('application/json');
      return res.json(json);
    }).catch(err => console.log(err));
  },
  // 編輯頁面
  send_edit(req, res) {
    const upObj = req.allParams();
    delete upObj.id;
    Support.update({ support_pk: req.param('id') }, upObj)
      .exec((err, data) => {
        if (err) console.log('err--', err);
        return res.json(data);
      })
  },
  cluster(req, res) {
    co(function* () {
      const sql = "SELECT * FROM `support`";
      const arr = [];
      const findData = yield map_service.find_data(sql, arr);

      res.json(findData);
    }).catch(err => console.log(err));
  },
  add_support(req, res) {
    co(function* () {
      const sql = "insert into `support` (user_pk, sup_name, sup_email,sup_context,status) VALUES (?,?,?,?,?)";
      const arr = ['999', 'mysql-proxy', 'mysql-proxy@gmail.com', 'mysql-proxy', 'receive'];
      const findData = yield map_service.find_data(sql, arr);
      res.json(findData);
    }).catch(err => console.log(err));
  },
  send_support(req, res) {
    co(function* () {
      const all = req.allParams();
      Support.create(all).exec((err, data) => {
        if (err) return res.json(err);
        res.json(data);
      })

    }).catch(err => console.log(err));
  }
};
