const router = require("express").Router();
const { isLoggedIn } = require("../middleware");
const { isARCHITECT, isAGENT, isPEASANT } = require("../utils");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  const user = req.session.currentUser;

  User.findById(user._id)
    .then((user) => {
      const checkArchitect = isARCHITECT(req.session.currentUser);
      const checkAgent = isAGENT(req.session.currentUser);
      const checkPeasant = isPEASANT(req.session.currentUser);

      res.render("user/profile", {
        user,
        checkArchitect,
        checkAgent,
        checkPeasant,
      });
    })

    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const user = req.session.currentUser;

  const { email, password, avatarImg } = req.body;

  User.findByIdAndUpdate(user._id, { email, password, avatarImg })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.post("/eliminar/:id", (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
