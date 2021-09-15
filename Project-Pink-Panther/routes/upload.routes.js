const router = require("express").Router();
const { CDNupload } = require("../config/upload.config");
const { isLoggedIn } = require('../middleware')
const Tag = require("../models/Tag.model");
const Upload = require("../models/Upload.model");
const User = require("../models/User.model");

router.get("/", isLoggedIn, (req, res) => {
  const { currentTag } = req.query;
  Upload.find({ tag: currentTag })
    .then(allUpload => res.render("upload/list-tag", { allUpload }))
    .catch((err) => console.log(err));
});

router.post("/eliminar/:id", isLoggedIn, checkRoles('ARCHITECT'), (req, res) => {
  const { id } = req.params;

  Upload.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/detalles/:id", isLoggedIn, checkRoles('ARCHITECT' || 'AGENT'),(req, res) => {
  const { id } = req.params;
  Upload.findById(id)
    .populate("tagId")
    //.select("tagId location")
    .then((theUpload) => res.render("upload/details", theUpload))
    .catch((err) => console.log(err));
});

router.get("/crear",  isLoggedIn,(req, res) => res.render("upload/create"));

router.post("/crear", CDNupload.single("img"), (req, res) => {
  const { lng, lat, tag } = req.body;
  // const path = req.file.path
  const location = {
    type: "Point",
    coordinates: [lat, lng],
  };

  Tag.findOne({ name: tag })
    .then((theTag) => {
      if (theTag) {
        return theTag;
      } else {
        return Tag.create({ name: tag });
      }
    })
    .then((theTag) => {
      return Upload.create({ tagId: theTag.id, img: req.file.path, location });
    })
    .then(() => {
      
      const user = req.session.currentUser;
      
      return User.findByIdAndUpdate(
        user._id,
        {
          counter: ++user.counter,
          role: user.counter > 10 ? "AGENT" : "PEASANT",
        },
        { new: true }
      );
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
