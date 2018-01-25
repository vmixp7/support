module.exports.myconf = {
  awsAdminKey: 'AKIAIOT5FDHVZQK6BTGA',
  awsAdminSecret: '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',
  awsGusetBucket: 'pawbo-contact',  // 使用者專用存放桶
  // google 資訊
  GGMail: 'team@pawbo.com',
  GGPassword: 'w&3MgvP^(+D)yJ$a',
  GGWebMapKey: 'AIzaSyCWbLzdFZpZweJxGt5lFiFlHn1lIGKXIQk',
  GGAndroidMapKey: 'AIzaSyARAlnF-sIdZ5FrA98znijSAdKPVaNy7CM',
  GGIosMapKey: 'AIzaSyCPBwEo7SYv_NLGMvTQnMDwoYKaHKGRiFw',
  lang: ['tw', 'en', 'es', 'fr', 'de'],
  active: [
        { text: '停用', value: 'stop' },
        { text: '啟用', value: 'work' },
  ],
  sex: [
        { text: 'male', value: '男' },
        { text: 'female', value: '女' }
  ],
  yesno: [
        { text: 'no', value: false },
        { text: 'yes', value: true }
  ],
  turn: [
        { text: 'open', value: 'open' },
        { text: 'close', value: 'close' }
  ],
  sendMail: {
    from: 'system@pawbo.com',
    subject: 'Pawbo官網客服中心'
  },
  source: [
    { text: 'phone', value: 'phone' },
    { text: 'email', value: 'email' },
    { text: 'web', value: 'web' }
  ],
  priority: [
    { text: 'normal', value: 'normal' },
    { text: 'low', value: 'low' },
    { text: 'high', value: 'high' }
  ],
  phone_os: [
    { text: 'android', value: 'android' },
    { text: 'apple', value: 'apple' }
  ],
  replyEndStatus:[3,5]
};
