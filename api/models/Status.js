/**
 * Question_type.js
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
     status_pk: {
       type: 'int',
       primaryKey: true,
       unique: true,
       autoIncrement: true
     },
     status_name: {
       type: 'string',
       size: 255
     }
   }
 };
