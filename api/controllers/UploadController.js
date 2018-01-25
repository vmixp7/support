/**
 * ReplyController
 *
 * @description :: Server-side logic for managing replies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const co = require('co');
const moment = require('moment');

module.exports = {
  sendS3(req, res) {
    const who = '';
    let returnObj = '';

    co(function* () {
      const key = sails.config.myconf.awsAdminKey;
      const secret = sails.config.myconf.awsAdminSecret;
      const bucket = sails.config.myconf.awsGusetBucket;
      const s3result = yield Upload_service.upload_s3(req, key, secret, bucket);
      console.log('req-----------',req.allParams());
      const inputObj = {
        url: s3result.Location,
        type: s3result.type,
        status: 'work'
      }
      console.log('inputObj---------',inputObj);
      const fileData = yield File.create(inputObj).then((data) => data);
      console.log(fileData);
      if (!fileData) res.json({ result:'error'});
      const results = {
        result:'ok',
        file_pk: fileData.file_pk
      };
      return res.json(results);
    }).catch((err) => {
      console.log('s3_error', err);
      return res.json({result:'error'});
    });
  },
  delS3(req, res) {
    const who = '';
    let returnObj = '';

    co(function* () {
      const key = sails.config.myconf.awsAdminKey;
      const secret = sails.config.myconf.awsAdminSecret;
      const bucket = sails.config.myconf.awsGusetBucket;
      const s3result = yield Upload_service.delete_s3(req, key, secret, bucket);
      console.log('req-----------',req.allParams());
      const inputObj = {
        url: s3result.Location,
        type: s3result.type,
        status: 'work'
      }
      console.log('inputObj---------',inputObj);
      const fileData = yield File.create(inputObj).then((data) => data);
      console.log(fileData);
      if (!fileData) res.json({ result:'error'});
      const results = {
        result:'ok',
        file_pk: fileData.file_pk
      };
      return res.json(results);
    }).catch((err) => {
      console.log('s3_error', err);
      return res.json({result:'error'});
    });
  },
  userSendS3(req, res) {
    const who = '';
    let returnObj = '';

    co(function* () {
      const key = sails.config.myconf.awsAdminKey;
      const secret = sails.config.myconf.awsAdminSecret;
      const bucket = sails.config.myconf.awsGusetBucket;
      const s3result = yield Upload_service.upload_s3(req, key, secret, bucket);
      console.log('ok',s3result);
      const results = {
        result:'ok',
        datas:s3result
      };
      return res.json(results);
    }).catch((err) => {
      console.log('s3_error', err);
      return res.json({result:'error'});
    });
  },
  // 寄信函數
  sendMail(req, res) {
    co(function* () {
      const params = req.allParams();
      const options = {
        // 寄件者
        from: 'system@pawbo.com',
        // 收件者
        to: params.to,
        // 副本
        cc: params.cc,
        // 密件副本
        bcc: params.bcc,
        // 主旨
        subject: params.subject, // Subject line
        // 純文字
        text: params.text, // plaintext body
        // 嵌入 html 的內文
        html: params.html
      };

      returnObj = yield common_Service.sendMail(options);
      return res.json(returnObj);
    }).catch((err) => {
      console.log(`${tableName}_catch_error`, err);
      // return res.send( tableName+"_catch_error");
      return res.send(JSON.stringify(err));
    });
  }
};
