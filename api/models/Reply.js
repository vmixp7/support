/**
 * Reply.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const co = require('co');
module.exports = {

  // 不要用自動的UUID參數
  autoPK: false,
  // 強制限定樣式，不存在的Schema不可存
  schema: true,
  // 欄位設定
  attributes: {
    reply_pk: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    support_pk: {
      type: 'int',
      size: 11,
      required: true
    },
    email: {
      type: 'string',
      size: 256
    },
    content: {
      type: 'string',
      size: 256,
      required: true
    },
    role: {
      type: 'string',
      size: 256
    },
    change_status: {
      type: 'string',
      size: 256
    },
    files: {
      type: 'string'
    },
    ip: {
      type: 'string'
    }
  }
};
