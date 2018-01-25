/**
 * nationController
 *
 * @description :: Server-side logic for managing nations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const co = require('co');
const moment = require('moment');

const listLink = `/nation/list/`;
const addLink = `/nation/add/`;
const viewLink = `/nation/viewAll/`;
const submitLink = `/api/nation/`;
const colsArray = [
  'nation_pk',
  'nation_name',
  'nation_name_en',
  'group_name',
  'updatedAt'
];

module.exports = {
  // 列表頁面 http://localhost:1337/nation/list
  nation_list(req, res) {
    const returnObj = {};
    returnObj.link_to_add = addLink;
    returnObj.nowLink = req.route.path;
    returnObj.viewLink = viewLink;
    return res.view(false, returnObj);
  },
  // 新增頁面 http://localhost:1337/nation/add
  nation_add(req, res) {
    const returnObj = {};
    returnObj.link_to_submit = submitLink;
    returnObj.link_to_list = listLink;
    returnObj.nowLink = req.route.path;
    return res.view(false, returnObj);
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
      const countAll = yield ajax_service.nationAjaxCount({});
      const countDisplay = yield ajax_service.nationAjaxCount(options);
      const findData = yield ajax_service.nationFind(options2);
      // 製作 前端產生結果
      const retnation = [];
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

        const modifyUrl = `return swalSelectSubmit("${submitLink}${oneData.nation_pk}","${oneData.customer_group_pk}")`;
        pushObj.finalModify = `<a href="javascript:;" onClick='${modifyUrl}'>修改</a>`;
        retnation.push(pushObj);
      }
      const json = {
        aaData: retnation,
        iTotalRecords: countAll,
        iTotalDisplayRecords: countDisplay
      };

      res.contentType('application/json');
      return res.json(json);
    }).catch(err => console.log(err));
  }

};
