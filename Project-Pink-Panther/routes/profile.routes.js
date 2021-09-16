const router = require("express").Router();
const { isLoggedIn } = require("../middleware");

const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .then((user) => res.render("user/profile", user))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const user = req.session.currentUser;

  const { email, password, avatarImg } = req.body;

  User.findByIdAndUpdate(user._id, { email, password, avatarImg })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
