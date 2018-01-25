module.exports.routes = {
  // home login
  '/': { view: 'login', locals: { errMsg: '' } },
  '/login/check': { controller: 'pbadmin', action: 'loginCheck' },
  '/logout': { controller: 'pbadmin', action: 'logout' },
  '/admin/change_pass': { controller: 'pbadmin', action: 'change_pass', locals: { layout: 'layout/normal', active: 'admin' } },
  '/admin/send_change_pass': {  controller: 'pbadmin', action: 'send_change_pass' },
  '/admin/list': {  controller: 'pbadmin', action: 'change_pass', locals: { layout: 'layout/normal', active: 'admin' } },
  // support
  '/support/list': { controller: 'support', action: 'support_list', locals: { layout: 'layout/normal', active: 'support', big_title: '問題清單', bar_title: '' } },
  '/support/add': { controller: 'support', action: 'support_add', locals: { layout: 'layout/normal', active: 'support', big_title: '新增問題', bar_title: '', submit_but: '確認' } },
  '/support/edit/:id': { controller: 'support', action: 'support_edit', locals: { layout: 'layout/normal', active: 'support', big_title: '修改問題', bar_title: '', submit_but: '修改' } },
  '/support/detail/:id': { controller: 'support', action: 'support_detail', locals: { layout: 'layout/normal', active: 'support' } },
  '/support/user_reply/:id': { controller: 'support', action: 'user_reply', locals: { layout: 'layout/user_normal', active: 'support' } },
  '/support/reply_edit/:id': { controller: 'reply', action: 'reply_edit', locals: { layout: 'layout/normal', active: 'support' } },
  '/support/sendall': { controller: 'support', action: 'send_all', locals: { layout: 'layout/normal', active: 'support', big_title: '寄信給所有人', bar_title: '', submit_but: '送出' } },
  '/support/viewAll': { controller: 'support', action: 'viewAll' },
  // question_type
  '/question_type/list': { controller: 'question_type', action: 'question_type_list', locals: { layout: 'layout/normal', active: 'admin', big_title: '問題類別', bar_title: '', submit_but: '確認' } },
  '/question_type/add': { controller: 'question_type', action: 'question_type_add', locals: { layout: 'layout/normal', active: 'question_type', big_title: '新增問題', bar_title: '', submit_but: '確認' } },
  '/question_type/viewAll': { controller: 'question_type', action: 'viewAll' },
  // nation
  '/nation/list': { controller: 'nation', action: 'nation_list', locals: { layout: 'layout/normal', active: 'admin', big_title: '問題類別', bar_title: '', submit_but: '確認' } },
  '/nation/add': { controller: 'nation', action: 'nation_add', locals: { layout: 'layout/normal', active: 'nation', big_title: '新增問題', bar_title: '', submit_but: '確認' } },
  '/nation/viewAll': { controller: 'nation', action: 'viewAll' },
  // 寫入S3資料並獲得回傳-
  'POST /api/upload/sendS3': { controller: 'upload', action: 'sendS3' },
  // 發出信件
  'POST /api/sendMail': { controller: 'upload', action: 'sendMail' },
  // 回覆問題
  '/reply/customer_reply': { controller: 'reply', action: 'customer_reply' },
  '/reply/user_reply': { controller: 'reply', action: 'user_reply' },
}
