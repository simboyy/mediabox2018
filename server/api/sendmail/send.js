'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send = send;
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var mg = require('nodemailer-mailgun-transport');
// html to text plugin 
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var hbs       = require ('nodemailer-express-handlebars');

function send(req) {
    var options = {
        auth: {
            api_key: process.env.SENDGRID_APIKEY
        }
    };

    var mailer = nodemailer.createTransport(sgTransport(options));
	
	var auth = {
	  auth: {
		api_key: 'key-a2cb48ef184b3e02e563b2d3a521aa48',
		domain: 'mg.mediabox.co.zw'
	  },
	  proxy: false // optional proxy, default is false
	}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));
	nodemailerMailgun.use('compile',hbs({
		viewPath:'views/email',
		extName:'.hbs'
	}));
    nodemailerMailgun.sendMail(req, function (error, info) {

        var res = {};
        if (error) {
            res = { status: 408, err: error };
            console.log(error);
        } else {
            res = { status: 200, success: true };
            console.log(res);
            console.log(info);
        }
        return res;
    });
}
//# sourceMappingURL=send.js.map
