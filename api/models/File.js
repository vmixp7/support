/**
 * File.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  // 不要用自動的UUID參數
  autoPK: false,
  // 強制限定樣式，不存在的Schema不可存
  schema: true,
  // 欄位設定
  attributes: {
    file_pk: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    url: {
      type: 'text'
    },
    description: {
      type: 'string',
      size: 256
    },
    type: {
      type: 'string',
      size: 255
    },
    status: {
      type: 'string',
      size: 255
    }
  }
};

