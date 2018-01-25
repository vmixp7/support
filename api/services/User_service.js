const co = require('co');
const moment = require('moment');

const changeObj = {
  id: 'user_pk',
  email: 'account',
  password: 'pw',
  name: 'user_name',
  nickname: 'user_nickname',
  address: 'user_address',
  avatarPath: 'img_path',
  birthday: 'user_birthday',
  tel: 'user_tel',
  isActive: 'status'
};

const tableName = 'User';
const logType = 'APP';

// 此處出現的都是co要用的
module.exports = {
  // 寫資料 通常只須改DB_NAME
  write_db(createCond, who, inputParams) {
    return new Promise((resolve, reject) => {
      User.create(createCond).exec((err, createData) => {
        let returnData;
        if (err) {
          common_Service.write_log(`/${tableName}/C`, 'die', inputParams, who, logType);
          returnData = common_Service.default_result([{}], false, '1001', err.details);
          reject(returnData);
        } else {
          common_Service.write_log(`/${tableName}/C`, 'ok', inputParams, who, logType);
          returnData = common_Service.default_result([{}], true, '200', '');
          resolve(returnData);
        }
      });
    });
  },
  // 查詢資料 通常只須改DB_NAME
  find_R_db(searchCond, who, inputParams) {
    return new Promise((resolve, reject) => {
      User.find(searchCond).exec((err, findData) => {
        let returnData;
        if (err) {
          common_Service.write_log(`/${tableName}/R`, 'die', inputParams, who, logType);
          returnData = common_Service.default_result([{}], false, '1002', err.details);
          resolve(returnData);
        } else if (_.isEmpty(findData)) {
            // 查無資料
          common_Service.write_log(`/${tableName}/R`, 'no_data', inputParams, who, logType);
          returnData = common_Service.default_result([{}], true, '200', '查無資料');
          resolve(returnData);
        } else {
          common_Service.write_log(`/${tableName}/R`, 'ok', inputParams, who, logType);
          returnData = common_Service.default_result(findData, true, '200', '');
          resolve(returnData);
        }
      });
    });
  },
  // 修改資料 通常只須改DB_NAME
  update_db(searchCond, updateCond, who, inputParams) {
    return new Promise((resolve, reject) => {
      User.update(searchCond, updateCond).exec((err, updateData) => {
        let returnData;
        if (err) {
          common_Service.write_log(`/${tableName}/U`, 'die', inputParams, who, logType);
          returnData = common_Service.default_result([{}], false, '1003', err.details);
          resolve(returnData);
        } else if (_.isEmpty(updateData)) {
          // 查無資料
          common_Service.write_log(`/${tableName}/U`, 'no_data', inputParams, who, logType);
          returnData = common_Service.default_result([{}], true, '200', '查無資料');
          resolve(returnData);
        } else {
          // 有資料
          common_Service.write_log(`/${tableName}/U`, 'ok', inputParams, who, logType);
          returnData = common_Service.default_result([{}], true, '200', '');
          resolve(returnData);
        }
      });
    });
  },
  // 刪除資料 通常只須改DB_NAME
  destroy_db(deleteCond, who, inputParams) {
    return new Promise((resolve, reject) => {
      User.update(deleteCond, { status: 'stop' }).exec((err, updateData) => {
        let returnData;
        if (err) {
          common_Service.write_log(`/${tableName}/D`, 'die', inputParams, who, logType);
          returnData = common_Service.default_result([{}], false, '1004', err.details);
          resolve(returnData);
        } else {
          common_Service.write_log(`/${tableName}/D`, 'ok', inputParams, who, logType);
          returnData = common_Service.default_result(updateData, true, '200', '');
          resolve(returnData);
        }
      });
    });
  },
  // 新增主function 通常須改上面的條件function 還有service位置
  create(inputParams, who) {
    return new Promise((resolve, reject) => {
      co(function* () {
        // 輸入 必填 不可填 以及 條件array
        const fillArray = ['email', 'password', 'isActive'];
        const nfillArray = ['id'];
        const condArray = [];

        // 檢驗結果
        const checkMust = yield common_Service.check_fill_nfill(inputParams, fillArray, nfillArray);

        if (checkMust === 'ok') {
          // 輸入條件正確 修正資料ID內容
          const rArray = yield common_Service.mod_cond(inputParams, changeObj, condArray, 0);
          const finalData = yield User_service.write_db(rArray[0], who, inputParams);
          const backData = yield common_Service.back_change_cond(finalData, changeObj);
          resolve(backData);
        } else {
          // 輸入條件有誤 直接回傳錯誤JSON
          resolve(checkMust);
        }
      }).catch((err) => {
        console.log(`${tableName}_create`, err);
        reject(err);
      });
    });
  },
  // 查詢主function 通常須改上面的條件function 跟 catch
  search(inputParams, who) {
    return new Promise((resolve, reject) => {
      co(function* () {
        // 輸入 必填 不可填 以及 條件array
        const fillArray = [];
        const nfillArray = [];
        const condArray = [];

        // 檢驗結果
        const checkMust = yield common_Service.check_fill_nfill(inputParams, fillArray, nfillArray);

        if (checkMust === 'ok') {
          // 輸入條件正確 修正資料ID內容
          const rArray = yield common_Service.mod_cond(inputParams, changeObj, condArray, 0);

          // rArray[0].ds_deleted = {"$exists":false}; //補上刪除不可被查
          const finalData = yield User_service.find_R_db(rArray[0], who, inputParams);
          const backData = yield common_Service.back_change_cond(finalData, changeObj);
          resolve(backData);
        } else {
          // 輸入條件有誤 直接回傳錯誤JSON
          resolve(checkMust);
        }
      }).catch((err) => {
        console.log(`${tableName}_search`, err);
        reject(err);
      });
    });
  },
  // 修改主function 通常須改上面的條件function 跟 catch
  update(inputParams, who) {
    return new Promise((resolve, reject) => {
      co(function* () {
        // 輸入 必填 不可填 以及 條件array<條件要用轉換後的>
        const fillArray = ['id'];
        const nfillArray = [];
        const condArray = ['user_pk'];

        // 檢驗結果
        const checkMust = yield common_Service.check_fill_nfill(inputParams, fillArray, nfillArray);

        if (checkMust === 'ok') {
          // 輸入條件正確 修正資料ID內容
          const rArray = yield common_Service.mod_cond(inputParams, changeObj, condArray, 0);
          const finalData = yield User_service.update_db(rArray[1], rArray[0], who, inputParams);
          const backData = yield common_Service.back_change_cond(finalData, changeObj);
          resolve(backData);
        } else {
          // 輸入條件有誤 直接回傳錯誤JSON
          resolve(checkMust);
        }
      }).catch((err) => {
        console.log(`${tableName}_update`, err);
        reject(err);
      });
    });
  },
  // 刪除主function 通常須改上面的條件function 跟 catch
  destroy(inputParams, who) {
    return new Promise((resolve, reject) => {
      co(function* () {
        // 輸入 必填 不可填 以及 條件array<條件要用轉換後的>
        const fillArray = ['id'];
        const nfillArray = ['email', 'password', 'name', 'nickname', 'address', 'avatarPath', 'birthday', 'tel', 'isActive'];
        const condArray = [];
        const checkMust = yield common_Service.check_fill_nfill(inputParams, fillArray, nfillArray);

        if (checkMust === 'ok') {
          // 輸入條件正確 修正資料ID內容
          const rArray = yield common_Service.mod_cond(inputParams, changeObj, condArray, 0);
          const finalData = yield User_service.destroy_db(rArray[0], who, inputParams);
          const backData = yield common_Service.back_change_cond(finalData, changeObj);
          resolve(backData);
        } else {
          // 輸入條件有誤 直接回傳錯誤JSON
          resolve(checkMust);
        }
      }).catch((err) => {
        // console.log(`${tableName}_destroy`, err);
        reject(err);
      });
    });
  },
  // 取User資料
  getUser(id, cols) {
    return new Promise((resolve, reject) => {
      const findData = { user_pk: id, select: cols };
      User.findOne(findData, (err, results) => {
        if (err) { return reject(err); }
        if (!results) {
          resolve({});
        } else {
          resolve(results);
        }
      });
    });
  },
  // 檢查帳號密碼
  chkAccount(reqAccount, reqPasswd) {
    return new Promise((resolve, reject) => {
      Customer.findOne({ email: reqAccount, passwd: reqPasswd }).exec((err, findData) => {
        console.log('login--', findData);
        if (err) {
          console.log('err--', err);
          return resolve('err');
        }
        return resolve(findData);
      })
    })
  }
};
