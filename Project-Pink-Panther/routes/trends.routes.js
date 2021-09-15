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
  let arrUploadTrend = [];

  //const trend1,trend2, trend3, trend4, trend5 = [];

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
      const promiseArray = top.map((element) => Tag.findById(element));

      return Promise.all(promiseArray);
    })
    .then((trendingTags) => {
      const promiseArray = trendingTags.map((elem) =>
        Upload.find({ tagId: elem.id }).populate("tagId")
      );

      Promise.all(promiseArray).then((allUploads) => {
        res.render("trends", { trendingTags, allUploads });
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
