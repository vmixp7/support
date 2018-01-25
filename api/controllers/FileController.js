/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	edit_file(req,res){
        const id = req.param('file_pk');
        const desc = req.param('description');
        File.update({file_pk: id},{description: desc}).exec((err, data) => {
            if (err) return res.json(false);
            res.json(data[0]);
        })
    },
	delete_file(req,res) {
        const id = req.param('file_pk');
        File.destroy({file_pk: id}).exec((err, data) => {
            if (err) return res.json(false);
            res.json(data[0]);
        })
    }
};

