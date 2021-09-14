const router = require("express").Router();

const { CDNupload } = require("../config/upload.config")

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
  console.log(id)
  Upload.findById(id)
    .populate("tagId")
    .then((theUpload) => res.render("upload/details", theUpload))
    .catch((err) => console.log(err))
});

//Create an Upload
router.get("/crear", (req, res) => {
  res.render("upload/create")
});

router.post("/crear", CDNupload.single('img'), (req, res) => {

  const { lng, lat, tag } = req.body



      console.log('Objeto file de Multer:', req.file)



  Tag.findOne({ name: tag })
    .then((theTag) => {

      const location = {
        type : 'Point',
        coordinates: [lat, lng]
      }

      if (theTag) {

        Upload.create({
          tagId: theTag.id,
          img: req.file.path,
          location
        })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))

      } else {
        Tag.create({ name: tag })
          .then((newTag) => {

            Upload.create({ 
              tagId: newTag.id,
              img: req.file.path,
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
