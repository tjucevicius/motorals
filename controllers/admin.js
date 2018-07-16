'use strict';
const path = require('path');
const fs = require('fs');


module.exports = function(formidable) {
    return {
        SetRouting: function(router) {
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', this.uploadFile);
        },

        adminPage: function(req, res) {
            res.render('admin/dashboard');
        },

        uploadFile: function(req, res) {
            const form = new formidable.IncomingForm();
            form.uploadDir = path.join(__dirname, '../public/uploads');

            form.on('file', function(field, file) {
                fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
                    if(err) throw err;
                    console.log('file renamed successfully');
                })
            });

            form.on('error', function(err) {
                console.log('beda');
            });

            form.on('end', function() {
                console.log('file upload is successfully');
            });

            form.parse(req);
        }
    }
}

