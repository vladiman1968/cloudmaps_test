// EmailService.js - in api/services

module.exports = {

    sendMail: function(res,id,password,email) {

          var nodemailer = require('nodemailer');
          var smtpTransport = require('nodemailer-smtp-transport');
          var transporter = nodemailer.createTransport(smtpTransport({
              host: 'localhost',
              port: 25,
              ignoreTLS: true
            })
          );
          var mailOptions ={
            from: 'test@cloudmaps.ru' ,
            to: email,
            subject: 'User Activation Email',
            text: 'http://localhost:1337/user/register/?id='+id+'&t='+password
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              res.view('user/error', {message: 'При регистрации пользователя произошла ошибка: ' + error.message});
            }
            else res.view('user/after_register');
          });

    }
};
