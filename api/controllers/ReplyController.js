/**
 * ReplyController
 *
 * @description :: Server-side logic for managing replies
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
const submitLink = `/api/reply/`;

module.exports = {
  reply_edit:function(req, res) {
    co(function* () {
      const inputCond = {
        reply_pk: req.param("id")
      }
      const replyData = yield ajax_service.replyFind(inputCond);
      const results = {
        findData:replyData[0],
        submitLink: submitLink,
        listLink: listLink
      };
      res.view(false, results);
    })
    .catch(err => res.json(err));
  },
  user_reply:function(req, res) {
    co(function* () {
      const postData = req.allParams();
      console.log("all--", postData);
      const addReply = yield Reply.create(postData).then(data => data);
      if (!addReply) return res.json({error:'create reply error'});
      const upStatus = yield Support.update({support_pk: postData.support_pk},{status: 4}).then(data => data);
      if (upStatus.length === 0) return res.json({error:'change status error'});
      res.json('ok');
    })
    .catch(err => res.json(err));
  },
  customer_reply:function(req, res) {
    co(function* () {
      const postData = req.allParams();
      console.log("all--", postData);
      const addReply = yield Reply.create(postData).then(data => data);
      if (!addReply) return res.json({error:'create reply error'});
      const upStatus = yield Support.update({support_pk: postData.support_pk},{status: 2}).then(data => data);
      if (upStatus.length === 0) return res.json({error:'change status error'});
      if (!upStatus[0].token) return res.json({error:'get token error'});

      let $text = "請使用下面連結查看留言,不要回覆此信件,謝謝!\r\n";
          $text += `${sails.config.myurl.url}/support/user_reply/${postData.support_pk}?token=${upStatus[0].token}`;
      const mailOptions = {
          from: '"Pawbo Support" <team@pawbo.com>', // sender address
          to: upStatus[0].sup_email, // list of receivers
          subject: '波寶客服系統', // Subject line
          text: $text, // plain text body
          // html: $html // html body
      };
      const sendMail = yield common_Service.sendMail(mailOptions);
      res.json('ok');
    })
    .catch(err => res.json(err));
  },

};
