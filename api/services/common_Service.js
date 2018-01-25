const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: sails.config.myconf.awsAdminKey,
  secretAccessKey: sails.config.myconf.awsAdminSecret
});

const sendmailId = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: sails.config.myconf.GGMail,
    pass: sails.config.myconf.GGPassword
  }
});

module.exports = {
  // 發送信件功能
  sendMail(optionObj) {
    return new Promise((resolve, reject) => {
      // 發送信件方法
      sendmailId.sendMail(optionObj, (error, info) => {
        if (error) {
          console.log(error);
          const returnData = common_Service.default_result(null, false, '9001', '');
          reject(returnData);
        }
        console.log('訊息發送', info);
        console.log('optionObj', optionObj);
        const returnData = common_Service.default_result(null, true, '2000', '');
        resolve(returnData);
      });
    });
  },
  // 檢查必填及不可填欄位
  check_fill_nfill(inputParams, fillArray, nfillArray) {
    return new Promise((resolve, reject) => {
      const inputCopy = _.clone(inputParams);
      const returnArray = [];

      _.map(fillArray, (num) => {
        if (inputCopy[num] === undefined) {
          returnArray.push(`缺少參數:${num}`);
        }
      });
      _.map(nfillArray, (num2) => {
        if (inputCopy[num2]) {
          returnArray.push(`不可填寫參數:${num2}`);
        }
      });

      if (returnArray.length === 0) {
        resolve('ok');
      } else {
        resolve(common_Service.default_result([{}], false, '1101', returnArray.join(' , ')));
      }
    });
  },
  // 變換參數為查詢或者新增條件 inputType是留著日後有特殊變換用的
  mod_cond(inputParams, changeRuleObj, condArray, inputType) {
    return new Promise((resolve, reject) => {
      const returnObj1 = _.clone(inputParams);
      const returnObj2 = {};
      switch (inputType) {
        // 預設查詢條件 全不拔除
        case 0:
        default:
          delete returnObj1.directType;
          delete returnObj1.submit_to_link;
          break;
      }
      _.map(changeRuleObj, (num, key) => {
        if (returnObj1[key] !== undefined) {
          returnObj1[num] = returnObj1[key];
          delete returnObj1[key];
        }
      });

      _.map(condArray, (num2) => {
        if (returnObj1[num2] !== undefined) {
          returnObj2[num2] = returnObj1[num2];
        }
      });
      resolve([returnObj1, returnObj2]);
    });
  },
  // 變換參數回使用者輸入模式
  back_change_cond(inputParams, changeRuleObj) {
    return new Promise((resolve, reject) => {
      const returnObj1 = inputParams;
      const originObj = inputParams;
      if (Array.isArray(inputParams.data)) {
        // array的換法
        for (let i = 0; i < originObj.data.length; i += 1) {
          _.map(changeRuleObj, (num, key) => {
            returnObj1.data[i][key] = originObj.data[i][num];
            delete originObj.data[i][num];
          });
        }
      } else {
        _.map(changeRuleObj, (num, key) => {
          returnObj1.data[key] = originObj.data[num];
          delete originObj.data[num];
        });
      }

      resolve(returnObj1);
    });
  },
  // 預定的回應畫面
  default_result(inputObj, inputSuccess, inputMessage, inputResp) {
    const returnObj = {};
    const resultObj = {
      success: inputSuccess,
      message: inputMessage
    };
    const resultClient = {
      resp: inputResp
    };
    returnObj.data = inputObj;
    returnObj.result = resultObj;
    returnObj.client = resultClient;
    return returnObj;
  },
  // 製作一個快速寫入api_LOG的function
  write_log(inputApi, status, inputData, who, type) {
    return new Promise((resolve, reject) => {
      let inputString;
      if (_.isObject(inputData)) {
        inputString = JSON.stringify(inputData);
      } else {
        inputString = inputData;
      }
      const createCond = {
        input_api: inputApi,
        status,
        input_data: inputString,
        who,
        type
      };
      Api_log_record.create(createCond).exec((err, createData) => {
        if (err) {
          reject(err);
        } else {
          resolve('ok');
        }
      });
    });
  },
  // 檢查日期是否大於今天
  checkDayAfter(inpData) {
    return moment(moment().format('YYYY-MM-DD')).isSameOrAfter(inpData);
  },
  // 將datas重建組成select使用的obj
  getSelect(datas, _text, _value) {
    return new Promise((resolve, reject) => {
      let dataArr = [];
      _.map(datas, function(num) {
          const obj = {text: num[_text], value: num[_value] };
          dataArr.push(obj);
      })
      resolve(dataArr);
    })
  }
};
