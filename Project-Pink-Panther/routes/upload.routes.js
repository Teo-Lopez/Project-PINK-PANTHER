const router = require("express").Router();

const Tag = require("../models/Tag.model");

const Upload = require("../models/Upload.model");

router.get("/", (req, res) => {
  const { currentTag } = req.query;
  Upload.find({ tag: currentTag })
    .then((allUpload) => res.render("upload/list-tag"), { allUpload })
    .catch((err) => console.log(err));
});

//Delete Upload
router.post("/eliminar/:id", (req, res) => {
  const { id } = req.params;

  Upload.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});


//Show the details of the Upload
router.get("/detalles/:id", (req, res) => {
  const { id } = req.params

  Upload.findById(id)
    .populate("tagId")
    .then((theUpload) => res.render("upload/details", theUpload))
    .catch((err) => console.log(err))
});
  

//Create an Upload
router.get("/crear", (req, res) => {
  res.render("upload/create")
});

router.post("/crear", (req, res) => {

  const { lng, lat, tag, img } = req.body

  Tag.findOne({ name: tag })
    .then((theTag) => {

      const location = {
        type : 'Point',
        coordinates: [lat, lng]
      }

      if (theTag) {

        Upload.create({
          tagId: theTag.id,
          img,
          location
        })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))

      } else {
        Tag.create({ name: tag })
          .then((newTag) => {

            Upload.create({ 
              tagId: newTag.id,
              img,
              location})
              .then(() =>  res.redirect('/'))
              .catch((err) => console.log(err))

          })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
})

module.exports = router;
