/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */
const moment = require('moment');
module.exports.http = {

  locals: {
        // ejs共用function
    filters: {
            // 轉換時間為現在日期
      trans_html_day(ctime) {
        if (ctime) {
          return moment(ctime).format('YYYY-MM-DD');
        }
        return '';
      },
            // 轉換時間為現在時間
      trans_html_daytime(ctime) {
        if (ctime) {
          return moment(ctime).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
      },
            // 轉換生日為年紀
      birthday_to_age(input_date) {
        if (input_date) {
          return `${moment().diff(moment(input_date), 'years')}歲`;
        }
        return '';
      },
            // 未填寫資料 改成尚未填寫
      show_data(input_data) {
        if (input_data) {
          return input_data;
        }
        return '';
      },
            // 避免錯誤使用的 check_obj
      check_obj(object_body, b1, b2, b3, b4, b5) {
        if (typeof object_body !== 'object') { return ''; }
        if (b1 == undefined) { return ''; } else if (object_body[b1] == undefined) { return ''; }
        if (b2 == undefined) { return object_body[b1]; } else if (object_body[b1][b2] == undefined) { return ''; }
        if (b3 == undefined) { return object_body[b1][b2]; } else if (object_body[b1][b2][b3] == undefined) { return ''; }
        if (b4 == undefined) { return object_body[b1][b2][b3]; } else if (object_body[b1][b2][b3][b4] == undefined) { return ''; }
        if (b5 == undefined) { return object_body[b1][b2][b3][b4]; } else if (object_body[b1][b2][b3][b4][b5] == undefined) { return ''; }
        return object_body[b1][b2][b3][b4][b5];
      },
// 快速產生HTML列表 系列
/*
    已製作有
        create_input
        create_date
        create_select
        create_hidden
        create_textarea
*/
            // 創建普通input
            // <%-: {is_require:true, is_readonly:true, input_ch:"文字抬頭", id_name:"input_id"}|create_input %>
      create_input(input_obj) {
        let final_str = "<div class='form-group'>";
        final_str += `<label>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
                        // 指定input type形態,沒設定就是text
        const inputType = (input_obj.inputType === undefined) ? 'text' : input_obj.inputType;
        if (input_obj.is_readonly) {
          final_str += `<input type='${inputType}' id='${input_obj.id_name}' name='${input_obj.id_name}'class='form-control' readonly/>`;
        } else {
          final_str += `<input type='${inputType}' id='${input_obj.id_name}' name='${input_obj.id_name}'class='form-control'/>`;
        }
        final_str += `<span id='${input_obj.id_name}_string'></span>`;
        final_str += '</div>';
        return final_str;
      },
            //
      create_textarea(input_obj) {
        let final_str = "<div class='form-group'>";
        final_str += `<label>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
        if (input_obj.is_readonly) {
          final_str += `<textarea id='${input_obj.id_name}' name='${input_obj.id_name}'class='form-control' readonly></textarea>`;
        } else {
          final_str += `<textarea id='${input_obj.id_name}' name='${input_obj.id_name}'class='form-control'></textarea>`;
        }
        final_str += `<span id='${input_obj.id_name}_string'></span>`;
        final_str += '</div>';
        return final_str;
      },
      // 創建日期input
      // <%-: {is_require:true, is_readonly:true, is_deafult:true, input_ch:"文字抬頭", id_name:"input_id"}|create_date %>
      create_date(input_obj) {
        if (input_obj.is_readonly) {
          var read_setting = 'readonly disabled';
        } else {
          var read_setting = '';
        }

        let final_str = "<div class='form-group'>";
        final_str += `<label class='control-label'>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
        final_str += `<input type="text" name="${input_obj.id_name}" id="${input_obj.id_name}" class="form-control date-picker" data-date-today-highlight="true" data-date-format="yyyy-mm-dd" size="16" ${read_setting}/>`;
        final_str += '</div>';
        if (input_obj.is_deafult == undefined) {
          final_str += `<script>$('#${input_obj.id_name}').datepicker('setDate', new Date());</script>`;
        }
        return final_str;
      },
      // 創建日期時間input
      // <%-: {is_require:true, is_readonly:true, is_deafult:true, input_ch:"文字抬頭", id_name:"input_id"}|create_datetime %>
      create_datetime(input_obj) {
        let final_str = `<label for='${input_obj.id_name}' class='control-label'>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
        final_str += `<div class='input-group date' id='${input_obj.id_name}_div' data-date-format='yyyy-mm-dd hh:ii' data-link-field='${input_obj.id_name}'>`;
        final_str += '<input class="form-control input_datetime" size="16" type="text" value="" readonly>';
        final_str += '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span><span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>';
        final_str += `<input type="hidden" id="${input_obj.id_name}" name="${input_obj.id_name}" value="" /><br/>`;
        final_str += '</div>';
        const date_time_cond = {
          weekStart: 1,
          todayBtn: 1,
          autoclose: 1,
          todayHighlight: 1,
          startView: 2,
          forceParse: 0,
          showMeridian: 0
        };
        final_str += `<script>$('#${input_obj.id_name}_div').datetimepicker(${JSON.stringify(date_time_cond)});</script>`;
        return final_str;
      },
      // 創建日期時間input
      // <%-: {is_require:true, is_readonly:true, is_deafult:true, input_ch:"文字抬頭", id_name:"input_id"}|create_datetime %>
      create_time(input_obj) {
        let final_str = "<div class='form-group'>";
        final_str += `<label for='${input_obj.id_name}' class='control-label'>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
        final_str += `<div class='input-group date' data-date-format="hh:ii" id='${input_obj.id_name}_div' data-link-format="hh:ii" data-link-field='${input_obj.id_name}'>`;
        final_str += '<input class="form-control" id="read_time" name="read_time" size="16" type="text" value="" readonly>';
        final_str += '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>';
        final_str += '<span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>';
        final_str += '</div>';
        final_str += `<input type="hidden" id="${input_obj.id_name}" name="${input_obj.id_name}" value="" />`;
        final_str += '</div>';
        const date_time_cond = {
            todayBtn:  0,
        		autoclose: 0,
        		todayHighlight: 0,
        		startView: 1
        };
        final_str += `<script>$('#${input_obj.id_name}_div').datetimepicker(${JSON.stringify(date_time_cond)});</script>`;
        return final_str;
      },
      // 創建下拉選單
      // <%-: {is_require:true, is_readonly:true, is_autocomplete:true, input_ch:"文字抬頭", id_name:"input_id", input_data:[{text:"aaa",value:"bbb"}], input_extra:null}|create_select %>
      create_select(input_obj) {
        let final_str = "<div class='form-group'>";
        final_str += `<label class='control-label'>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
        if (input_obj.is_autocomplete) {
          final_str += `<select class="bs-select form-control" data-live-search="true" data-size="8" id="${input_obj.id_name}" name="${input_obj.id_name}">`;
        } else {
          final_str += `<select class="form-control" id="${input_obj.id_name}" name="${input_obj.id_name}" aria-required="true" aria-invalid="false" aria-describedby="select-error">`;
        }
        final_str += '<option value="">請選擇</option>';
        if (input_obj.input_data) {
          _.each(input_obj.input_data, (num) => {
            final_str += `<option value="${num.value}">${num.text}</option>`;
          });
        }
        final_str += '</select>';
        if (input_obj.input_extra) {
          final_str += input_extra;
        }
        final_str += '</div>';
        return final_str;
      },
            // 創建隱藏input
            // <%-: { id_name:"input_id", id_value:"id_value"}|create_hidden %>
      create_hidden(input_obj) {
        const final_str = `<input type='hidden' id='${input_obj.id_name}' name='${input_obj.id_name}' value='${input_obj.id_value}'>`;
        return final_str;
      },
            // simulator專用
      create_input_simulator(input_class, input_array) {
                // 因應三個必填 補在此處
        input_array.push('device_id');
        input_array.push('push_token');
        input_array.push('device_type');

        let final_str = '';
        final_str += `<div class="${input_class} input_div" style="display:none">`;
        for (const key in input_array) {
          if (key % 4 == 0) {
            final_str += '<div class="row form-group">';
            final_str += '<div class="row col-lg-11">';
          }
          final_str += '<div class="col-lg-3">';
          final_str += `<input class="form-control ${input_array[key]} all_input" type="text" placeholder="${input_array[key]}">`;
          final_str += '</div>';

          if (key % 4 == 3 || key == (input_array.length - 1)) {
            final_str += '</div>';
            final_str += '<div class="row col-lg-1"></div>';
            final_str += '</div>';
          }
        }
        final_str += '</div>';
        return final_str;
      },
      create_input_file(input_obj) {
        let final_str = "<div class='form-group'>";
        final_str += `<label>${input_obj.input_ch}`;
        if (input_obj.is_require) {
          final_str += "<span class='required'>*</span>";
        }
        final_str += '</label>';
                        // 指定input type形態,沒設定就是text
        const inputType = (input_obj.inputType == 'undefined') ? 'text' : input_obj.inputType;
        if (input_obj.is_readonly) {
          final_str += `<input type='${inputType}' id='${input_obj.id_name}' name='${input_obj.id_name}'class='form-control' readonly/>`;
        } else {
          final_str += `<input type='${inputType}' id='${input_obj.id_name}' name='${input_obj.id_name}'class='form-control'/>`;
        }
        final_str += `<span id='${input_obj.id_name}_string'></span>`;
        final_str += '</div>';
        return final_str;
      },
      create_radio(input_obj) {
        let final_str = "<div class='form-group'>";
        final_str += `<label class="radio_name">${input_obj.input_ch}</label> `;
        if (input_obj.input_data) {
          _.each(input_obj.input_data, (num, key) => {
            const chked = (key == false) ? 'checked' : '';
            final_str += `<label class="radio-inline"><input type="radio" name='${input_obj.id_name}' value="${num.value}" ${chked} /> ${num.text}</label>`;
          });
        }
        final_str += '</div>';
        return final_str;
      },
      create_fileUpload(input_obj) {
        let final_str = '<div class="form-group">';
        final_str += '<span class="btn btn-success fileinput-button">';
        final_str += '<i class="glyphicon glyphicon-plus"></i>';
        final_str += '<span>選擇檔案</span>';
        final_str += `<input type="file" id="${input_obj.id_name}" name="uploadFile" multiple />`;
        final_str += '</span>';
        final_str += '</div>';
        final_str += '<div class="form-group">';
        final_str += '<div id="progress" class="progress hide">';
        final_str += '<div class="progress-bar progress-bar-success"></div>';
        final_str += '</div>';
        final_str += '</div>';
        final_str += `<script>$("#${input_obj.id_name}").on("click",function(){ $(this).parents("div").next().find("#progress").removeClass("hide") })</script>`;
        return final_str;
      }
    }
  },
  /** **************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {

  /** *************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    // order: [
    //   'startRequestTimer',
    //   'cookieParser',
    //   'session',
    //   'myRequestLogger',
    //   'bodyParser',
    //   'handleBodyParserError',
    //   'compress',
    //   'methodOverride',
    //   'poweredBy',
    //   '$custom',
    //   'router',
    //   'www',
    //   'favicon',
    //   '404',
    //   '500'
    // ],

  /** **************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /** *************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  * Note that Sails uses an internal instance of Skipper by default; to      *
  * override it and specify more options, make sure to "npm install skipper" *
  * in your project first.  You can also specify a different body parser or  *
  * a custom function with req, res and next parameters (just like any other *
  * middleware function).                                                    *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})

  }

  /** *************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
