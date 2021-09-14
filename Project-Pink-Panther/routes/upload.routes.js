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
  const { id } = req.params;

  Upload.findById(id)
    .populate("tagId")
    .then((theUpload) => res.render("upload/details", theUpload))
    .catch((err) => console.log(err));
});


//Create an Upload
router.get("/crear", (req, res) => {
  res.render("upload/create");
});

router.post("/crear", (req, res) => {
  const checkTag = "#hola";

  Tag.findOne({ name: checkTag })
    .then((theTag) => {
      if (theTag) {
        Upload.create({
          tagId: theTag.id,
          img: "existia el tag reloaded",
        }).then((upload) => {
          res.send(upload);
        });
      } else {
        Tag.create({ name: checkTag })
          .then((newTag) => {
            Upload.create({ tagId: newTag.id, img: "no existia el tag" }).then(
              (upload2) => {
                res.send(upload2);
              }
            );
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
