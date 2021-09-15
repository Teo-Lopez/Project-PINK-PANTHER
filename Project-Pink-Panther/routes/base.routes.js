const router = require("express").Router();

const Upload = require("../models/Upload.model");

const { shuffle } = require("../utils");

router.get("/", (req, res, next) => {
  Upload.find()
    .populate("tagId")
    .then((theUpload) => {
      const result = shuffle(theUpload);

      res.render("index", {
        result,
        isAGENT: req.session.currentUser?.role == "AGENT",
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
