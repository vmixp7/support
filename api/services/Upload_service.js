const skipperS3 = require('skipper-s3');
const AWS = require('aws-sdk');
const mime = require('mime-types');
const co = require('co');
const tableName = 'Upload';
const logType = 'web';

// 此處出現的都是co要用的
module.exports = {
  // 寫入S3 取得回傳值
  upload_s3(req, inputKey, inputSecret, inputBucket) {
    return new Promise((resolve, reject) => {

        req.file('uploadFile').upload({
          adapter: skipperS3,
          key: inputKey,
          secret: inputSecret,
          bucket: inputBucket
        }, (err, filesUploaded) => {
          if (err) {
            const who = '';
            common_Service.write_log(`/${tableName}/S3`, 'die', {}, who, logType);
            reject(common_Service.default_result(null, false, '4001', 'upload S3 error'));
          } else {
            const newParams = {
              size: filesUploaded[0].size,
              type: filesUploaded[0].type,
              filename: filesUploaded[0].filename,
              status: filesUploaded[0].status,
              Bucket: filesUploaded[0].extra.Bucket,
              Location: filesUploaded[0].extra.Location
            };

            resolve(newParams);
          }
        });


    });
  },
  // 砍掉S3的圖片
  delete_s3(inputBucket, inputFile) {
    return new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      const params = {
        Bucket: inputBucket,
        Key: inputFile
      };
      // 刪除檔案囉
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      });
    });
  },
  // 寫資料 通常只須改DB_NAME
  write_db(createCond, who, inputParams) {
    return new Promise((resolve, reject) => {
      Upload.create(createCond).exec((err, createData) => {
        let returnData;
        if (err) {
          common_Service.write_log(`/${tableName}/C`, 'die', inputParams, who, logType);
          returnData = common_Service.default_result(null, false, '9001', err.details);
          reject(returnData);
        } else {
          common_Service.write_log(`/${tableName}/C`, 'ok', inputParams, who, logType);
          returnData = common_Service.default_result([createData], true, '2000', '');
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
        const fillArray = [];
        const nfillArray = [];

        // 檢驗結果
        const checkMust = yield common_Service.check_fill_nfill(inputParams, fillArray, nfillArray);

        if (checkMust === 'ok') {
          // 輸入條件正確 修正資料ID內容
          const finalData = yield Upload_service.write_db(inputParams, who, inputParams);
          resolve(finalData);
        } else {
          // 輸入條件有誤 直接回傳錯誤JSON
          common_Service.write_log(`/${tableName}/C`, 'die', inputParams, who, logType);
          resolve(checkMust);
        }
      }).catch((err) => {
        console.log(`${tableName}_create`, err);
        reject(err);
      });
    });
  }
};
