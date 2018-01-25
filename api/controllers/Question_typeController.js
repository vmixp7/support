/**
 * question_typeController
 *
 * @description :: Server-side logic for managing question_types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const co = require('co');
const moment = require('moment');

const listLink = `/question_type/list/`;
const addLink = `/question_type/add/`;
const viewLink = `/question_type/viewAll/`;
const submitLink = `/api/question_type`;
const colsArray = [
  'question_type_pk',
  'question_name',
  'status',
  'updatedAt'
];

module.exports = {
  create: async function (req, res) {
    const allData = req.allParams();
    try {
      const result = await Question_type.create(allData).then((data) => data);
      res.json(result);
    } catch (err) {
      res.serverError(err);
    }
  },
  update: async function (req, res) {
    const allData = req.allParams();
    try {
      const result = await Question_type.update({ question_type_pk: allData.id }, allData).then((data) => data);
      res.json(result);
    } catch (err) {
      res.serverError(err);
    }
  },
  destroy: async function (req, res) {
    const allData = req.allParams();
    const option = {
      status:'stop'
    }
    try {
      const result = await Question_type.update({ question_type_pk: allData.id },option).then((data) => data);
      console.log(allData);
      res.json(result);
    } catch (err) {
      res.serverError(err);
    }
  },
  // 列表頁面 http://localhost:1337/question_type/list
  question_type_list(req, res) {
    const returnObj = {};
    returnObj.link_to_add = addLink;
    returnObj.nowLink = req.route.path;
    returnObj.viewLink = viewLink;
    return res.view(false, returnObj);
  },
  // 新增頁面 http://localhost:1337/question_type/add
  question_type_add(req, res) {
    const returnObj = {};
    returnObj.link_to_submit = submitLink;
    returnObj.link_to_list = listLink;
    returnObj.nowLink = req.route.path;
    return res.view(false, returnObj);
  },
  send_all(req, res) {
    co(function* () {
      const params = req.allParams();
      const findData = yield User.find({ status: "work", select: ["account"] }).then(data => data);
      if (!findData) { return res.json('notfound question_type_pk'); }

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
          or: searchOrCond
        },
        sort: `${colsArray[params.iSortCol_0]} ${params.sSortDir_0}`
      };
      const options2 = _.clone(options);
      options2.skip = params.iDisplayStart;
      options2.limit = params.iDisplayLength;
      const countAll = yield ajax_service.question_typeAjaxCount({});
      const countDisplay = yield ajax_service.question_typeAjaxCount(options);
      const findData = yield ajax_service.question_typeFind(options2);
      // 製作 前端產生結果
      const retquestion_type = [];
      for (let i = 0; i < findData.length; i += 1) {
        const oneData = findData[i];
        const pushObj = {};
        _.each(colsArray, (cols) => {
          pushObj[cols] = oneData[cols] || '';
        });
        // ----需要特殊處理的另外寫
        if (oneData.updatedAt) {
          pushObj.updatedAt = moment(oneData.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        }

        const modifyUrl = `return swalEditSubmit("${submitLink}${oneData.question_type_pk}","${oneData.question_name}")`;
        pushObj.finalModify = `<a href="javascript:;" onClick='${modifyUrl}'>修改</a>`;
        if (pushObj.status === 'work') {
          pushObj.active = `<a href='javascript:;' onclick='return edit_click("${submitLink}${oneData.question_type_pk}",${JSON.stringify({ status: 'stop' })},"停用")'>停用</a>`;
        } else {
          pushObj.active = `<a href='javascript:;' onclick='return edit_click("${submitLink}${oneData.question_type_pk}",${JSON.stringify({ status: 'work' })},"啟用")'>啟用</a>`;
        }
        retquestion_type.push(pushObj);
      }
      const json = {
        aaData: retquestion_type,
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
    question_type.update({ question_type_pk: req.param('id') }, upObj)
      .exec((err, data) => {
        if (err) console.log('err--', err);
        return res.json(data);
      })
  },
  cluster(req, res) {
    co(function* () {
      const sql = "SELECT * FROM `question_type`";
      const arr = [];
      const findData = yield map_service.find_data(sql, arr);

      res.json(findData);
    }).catch(err => console.log(err));
  },
  add_question_type(req, res) {
    co(function* () {
      const sql = "insert into `question_type` (user_pk, sup_name, sup_email,sup_context,status) VALUES (?,?,?,?,?)";
      const arr = ['999', 'mysql-proxy', 'mysql-proxy@gmail.com', 'mysql-proxy', 'receive'];
      const findData = yield map_service.find_data(sql, arr);
      res.json(findData);
    }).catch(err => console.log(err));
  }
};
