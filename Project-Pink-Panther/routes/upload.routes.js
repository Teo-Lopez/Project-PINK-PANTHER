const router = require("express").Router();

const Tag = require("../models/Tag.model");
const { findByIdAndRemove } = require("../models/Upload.model"); //teo dinos algo
const Upload = require("../models/Upload.model");

router.get("/", (req, res) => {
  const { currentTag } = req.query;
  Upload.find({ tag: currentTag })
    .then((allUpload) => res.render("upload/list-tag"), { allUpload })
    .catch((err) => console.log(err));
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  Upload.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/upload/details/:id", (req, res) => {
  const { id } = req.params;

  Upload.findById({ id })
    .then((theUpload) => res.render("uploads/details"), { theUpload })
    .catch((err) => console.log(err));
});

// router.get("/create",(req,res)=>{

// })

router.get("/create", (req, res) => {
  const checkTag = "#gatoEsperando";

  Tag.findOne({ name: checkTag }).then((theTag) => {
    if (theTag) {
      Upload.create({ tagId: theTag.id, img: "gatoJugando" }).then((upload) => {
        res.send(upload);
      });
    } else {
      Tag.create({ name: checkTag }).then((newTag) => {
        console.log(newTag);
        Upload.create({ tagId: newTag.id, img: "gatoFallando" }).then(
          (upload2) => {
            res.send(upload2);
          }
        );
      });
    }
  });
});

module.exports = router;
