module.exports = {

  // 不要用自動的UUID參數
  autoPK: false,
  // 強制限定樣式，不存在的Schema不可存
  schema: true,
  // 欄位設定
  attributes: {
    pbadmin_pk: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    account: {
      type: 'string',
      size: 256,
      required: true
    },
    passwd: {
      type: 'string',
      size: 256,
      required: true
    },
    role: {
      type: 'string',
      size: 256
    },
    token: {
      type: 'string',
      size: 256,
      required: true
    }
  }
};
