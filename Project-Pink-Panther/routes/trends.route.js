const router = require("express").Router();
const User = require("../models/User.model");
const Tag = require("../models/Tag.model");
const Upload = require("../models/Upload.model");
const { occurences } = require("../utils");

router.get("/", (req, res) => {
  const info = {};

  let arrUploadsTags = [];
  let arrTags = [];
  let arrTagsName = [];

  Tag.find()
    .then((tag) => {
      tag.forEach((element) => {
        arrTags.push(element._id.toString());
      });

      info.arrTags = arrTags;
      return Upload.find();
    })
    .then((response) => {
      response.forEach((element) => {
        arrUploadsTags.push(element.tagId.toString());
      });
      info.arrUploadsTags = arrUploadsTags;

      const top = occurences(info.arrTags, info.arrUploadsTags, 3);

      return top;
    })
    .then((top) => {
      const promiseArray = top.map((element) =>
        Tag.findById(element).then((theTag) => theTag.name)
      );

      Promise.all(promiseArray).then((result) => {
        res.render("trends", { result });
      });
    })

    .catch((err) => console.log(err));
});

module.exports = router;
