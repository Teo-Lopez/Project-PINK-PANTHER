const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

router.get("/registro", (req, res) => res.render("auth/signup-form"));
router.post("/registro", (req, res) => {
  const { email, userPwd } = req.body;

  if (userPwd.length === 0) {
    res.render("auth/signup-form", {
      errorMsg: "La contraseña es obligatoria",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.render("auth/signup-form", { errorMsg: "Usuario ya registrado" });
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
      errorMsg: "Se deben rellenar todos los campos",
    });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login-form", { errorMsg: "El usuario no existe" });
        return;
      }
      if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render("auth/login-form", { errorMsg: "Contraseña incorrecta" });
        return;
      }

      req.session.currentUser = user;

      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get("/cerrar-sesion", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
