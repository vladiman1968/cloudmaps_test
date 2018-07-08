/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.user) {
    User.findOne({id: req.session.user.id, active: true}).exec(function(error, user){
      if(error){
        res.view('user/error',{message: 'Ошибка: ' + error.message});
      }
      else{
        if(typeof user == 'undefined'){
          return res.redirect('/login');
        }
        else{
          return next();
        }
      }
    });
  }
};
