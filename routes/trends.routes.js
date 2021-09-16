const router = require("express").Router();
const User = require("../models/User.model");
const Tag = require("../models/Tag.model");
const Upload = require("../models/Upload.model");
const { occurences } = require("../utils");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, (req, res) => {
  const info = {};
  const arrUploadsTags = [];
  const arrTags = [];

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
        res.render("trends/list", { trendingTags, allUploads });
      });
    })
    .catch((err) => console.log(err));
});

router.get("/detalles/:id", (req, res) => {
  const { id } = req.params;

  Upload.find({ tagId: id })
    .populate("tagId")
    .then((tagUploads) => {
      let total = tagUploads.length
      //const result = shuffle(tagUploads);
      //const isUser = compareRole(req.session.currentUser);
      res.render("trends/details", { tagUploads, total });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
