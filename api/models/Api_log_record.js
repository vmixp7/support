/**
 * Api_log_record.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  // 不要用自動的UUID參數
  autoPK: false,
  // 強制限定樣式，不存在的Schema不可存
  schema: true,
  attributes: {
    // 欄位設定
    log_id: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    input_api: {
      type: 'text'
    },
    status: {
      type: 'text'
    },
    input_data: {
      type: 'text'
    },
    who: {
      type: 'text'
    },
    type: {
      type: 'text'
    }
  }
};
