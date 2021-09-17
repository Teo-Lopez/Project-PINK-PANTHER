const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

router.get("/registro", (req, res) => res.render("auth/signup-form"));
router.post("/registro", (req, res) => {
  const { email, userPwd } = req.body;

  if (userPwd.length === 0) {
    res.render("auth/signup-form", {
      errorMsg: "password required",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.render("auth/signup-form", { errorMsg: "email already exists" });
        return;
      }

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(userPwd, salt);

      User.create({ email, password: hashPass })
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/inicio-sesion", (req, res) => {
  res.render("auth/login-form");
});

router.post("/inicio-sesion", (req, res) => {
  const { email, userPwd } = req.body;

  if (userPwd.length === 0 || email.length === 0) {
    res.render("auth/login-form", {
      errorMsg: "all fields must be completed",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login-form", { errorMsg: "email does not exist" });
        return;
      }
      if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render("auth/login-form", { errorMsg: "incorrect password" });
        return;
      }

      req.session.currentUser = user;
      // req.app.locals.currentUser = user
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get("/cerrar-sesion", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
  req.app.locals.currentUser = null;
});

module.exports = router;
