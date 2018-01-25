/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_form_data: async function(req, res) {
        const result = {};
        const allData = req.allParams();
        const option1 = {
            status: 'work',
            select:['question_type_pk','question_name']
        }
        const option2 = {
            status: 'work',
            select:['model_pk','description']
        }
        const option3 = {
            select:['nation_pk','nation_name']
        }
        try {
          result.question_type = await Question_type.find(option1).then((data) => data);
          result.device_model = await Device_model.find(option2).then((data) => data);
          result.nation = await Nation.find(option3).then((data) => data);
          res.jsonp(result);
        } catch (err) {
          res.serverError(err);
        }
    },
	form_submit: async function(req, res) {

    },
};

