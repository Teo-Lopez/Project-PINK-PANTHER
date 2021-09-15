const mongoose = require("mongoose");

module.exports = {
  
  checkRoles:
    (...roles) =>
    (req, res, next) => {
      roles.includes(req.session.currentUser.role)
        ? next()
        : res.render("auth/login-form", { errorMsg: "No tienes permisos" });
    },
    isLoggedIn: (req,res, next) => {

        req.session.currentUser ? next() : res.render('auth/login-form', {errorMsg: 'Inicia sesion para continuar'})
        
    },
    isSameUser: (req, res, next) => {

        req.session.currentUser?._id === req.params.id ? next() : res.redirect('/error')

    },
};
