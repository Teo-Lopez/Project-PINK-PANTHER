const router = require("express").Router();

const Upload = require("../models/Upload.model");

const { shuffle } = require("../utils");

router.get("/", (req, res, next) => {
  Upload.findOne()
    .populate("tagId")
    .then((theUpload) => {
      const result = shuffle(theUpload);

      res.render("index", { result });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

//Meter aqui un if que te mande al registro si no tienes iniciada sesion?
