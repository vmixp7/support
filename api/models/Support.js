/**
 * support.js
 *
 * @description :: 寵物主表
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const randtoken = require("rand-token");
module.exports = {
  // 不要用自動的UUID參數
  autoPK: false,
  // 強制限定樣式，不存在的Schema不可存
  schema: true,
  // 欄位設定
  attributes: {
    support_pk: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    sup_name: {
      type: 'string',
      size: 255,
      required: true
    },
    sup_email: {
      type: 'string',
      size: 255,
      required: true
    },
    sup_tel: {
      type: 'string',
      size: 255
    },
    sup_carrier: {
      type: 'string',
      size: 255
    },
    sup_context: {
      type: 'text',
      required: true
    },
    files: {
      type: 'string'
    },
    buy_address: {
      type: 'string',
      size: 255
    },
    device_model_arr: {
      type: 'string'
    },
    question_type_arr: {
      type: 'string'
    },
    title: {
      type: 'string',
      size: 255
    },
    source: {
      type: 'string',
      size: 255
    },
    priority: {
      type: 'string',
      size: 255
    },
    mobile_type: {
      type: 'string',
      size: 255
    },
    os_mobile: {
      type: 'string',
      size: 255
    },
    version_mobile: {
      type: 'string',
      size: 255
    },
    os_app: {
      type: 'string',
      size: 255
    },
    nation_pk: {
      type: 'int',
      size: 11
    },
    customer_pk: {
      type: 'int',
      size: 11
    },
    status: {
      type: 'string',
      size: 255,
      required: true
    },
    token: {
      type: 'string',
      size: 255
    }
  },
  beforeCreate(values,next) {
    const token = randtoken.generate(16);
    console.log('token--',token);
    values.token = token;
    next();
  }
};
