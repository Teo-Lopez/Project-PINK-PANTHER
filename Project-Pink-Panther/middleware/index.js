const mongoose = require("mongoose");

module.exports = {
  checkRoles:
    (...roles) =>
    (req, res, next) => {
      roles.includes(req.session.currentUser.role)
        ? next()
        : res.render("auth/login", { errorMsg: "No tienes permisos" });
    },
};
