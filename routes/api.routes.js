const router = require("express").Router();

const Upload = require("../models/Upload.model");

router.get("/uploads", (req, res) => {
  Upload.find()
    .then((upload) => res.json(upload))
    .catch((err) => console.log(err));
});

module.exports = router;
