const router = require("express").Router();
const Upload = require("../models/Upload.model");
const User = require("../models/User.model");
const { isLoggedIn } = require('../middleware')

const { shuffle, userIsAGENT } = require("../utils");

router.get("/", isLoggedIn, (req, res, next) => {
  Upload.find()
    .populate("tagId")
    .then((theUpload) => {
      const result = shuffle(theUpload);
      const isAGENT = userIsAGENT(req.session.currentUser);
      res.render("index", {
        result,
        isAGENT,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
