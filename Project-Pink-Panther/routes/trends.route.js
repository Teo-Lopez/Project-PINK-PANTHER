const router = require("express").Router();
const User = require("../models/User.model");
const Tag = require("../models/Tag.model");
const Upload = require("../models/Upload.model");
const { occurrences } = require("../utils");

router.get("/", (req, res) => {
  let arrUploadsTags = [];
  let arrTags = [];

  Tag.find()
    .then((tag) => {
      tag.forEach((element) => {
        arrTags.push(element._id);
      });
    })
    .catch((err) => console.log(err));

  Upload.find()
    .then((response) => {
      response.forEach((element) => {
        arrUploadsTags.push(element.tagId);
      });
    })
    .catch((err) => console.log(err));

  const top = occurrences(arrTags, arrUploadsTags, 3);

  //res.render("trends", { top });

  res.send({ top });
});

module.exports = router;
