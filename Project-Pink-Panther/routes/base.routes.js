const router = require("express").Router();
const Upload = require("../models/Upload.model");
const User = require("../models/User.model");
const { shuffle, compareRole } = require("../utils");

router.get("/", (req, res, next) => {
  Upload.find()
    .populate("tagId")
    .then((theUpload) => {
      const result = shuffle(theUpload);
      const isUser = compareRole(req.session.currentUser);
      res.render("index", {
        result,
        isUser,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
