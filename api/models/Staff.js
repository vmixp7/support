module.exports = {

  // 不要用自動的UUID參數
  autoPK: false,
  // 強制限定樣式，不存在的Schema不可存
  schema: true,
  // 欄位設定
  attributes: {
    customer_pk: {
      type: 'int',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    email: {
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
    name: {
      type: 'string',
      size: 256
    },
    customer_group_pk: {
      type: 'int',
      size: 11
    }
  }
};
