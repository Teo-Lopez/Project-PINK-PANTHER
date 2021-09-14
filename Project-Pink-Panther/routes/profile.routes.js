const router = require("express").Router();



const User = require("../models/User.model");

//requerir middleware de inicio de sesion ( isLoggedIn )

router.get("/", (req, res) => {
  const user = req.session.currentUser;

  User.findById(user.id)
    .then(user => res.render("user/profile", user))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const user = req.session.currentUser;

  const { email, password, avatarImg } = req.body;

  User.findByIdAndUpdate(user.id, { email, password, avatarImg }, { new: true })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
