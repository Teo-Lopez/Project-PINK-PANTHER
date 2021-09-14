const router = require("express").Router();
const User = require("../models/User.model");
const Tag = require("../models/Tag.model");
const Upload = require("../models/Upload.model");
const { occurences } = require("../utils");

router.get("/", (req, res) => {
  const info = {};

  let arrUploadsTags = [];
  let arrTags = [];

  Tag.find()
    .then((tag) => {
      tag.forEach((element) => {
        arrTags.push(element._id);
      });
      console.log(arrTags);
      info.arrTags = arrTags;
      //   res.send(info.arrTags)
      return Upload.find();
      //res.send(arrTags);
    })
    .then((response) => {
      response.forEach((element) => {
        arrUploadsTags.push(element.tagId);
      });
      info.arrUploadsTags = arrUploadsTags;
      console.log(info.arrTags);

      const top = occurences(info.arrTags, info.arrUploadsTags, 3);
      res.render("trends", { top });
    })
    .catch((err) => console.log(err));

  //   res.send(arrTags);
});

module.exports = router;
