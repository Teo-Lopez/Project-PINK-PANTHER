const router = require("express").Router();

const Upload = require("../models/Upload.model");

router.get("/", (req, res, next) => {
  Upload.findOne()
    .populate("tagId")
    .then((theUpload) => {
      res.render("index", theUpload);
    })
    .catch((err) => console.log(err));
});

module.exports = router;

//Meter aqui un if que te mande al registro si no tienes iniciada sesion?
