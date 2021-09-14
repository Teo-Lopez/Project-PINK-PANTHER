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
  const tagdehola = "#hola";
  const theTagId = "613f8e11389a4c90298d8ac7";

  Tag.create({ name: "picando" })
    .then((theTag) => res.send(theTag))
    .catch((err) => console.log(err));
  //   Upload.create({ tagId: theTagId, img: "imagen27" })
  //     .then((theUpload) => res.send(theUpload))
  //     .catch((err) => console.log(err));

  //   Tag.findOne({ tagName: tagdehola }).then((theTag) => {
  /* if (theTag) {
      Upload.create({ tagId: theTag.id, img: "imagen" }).then((upload) => {
        res.send(upload);
      });
    } else {*/
  //   console.log("hola");
  //   Tag.create({ tagName: "#picando" }).then((newTag) => {
  //   Upload.create({ tagId: newTag.id, img: "imagen2" }).then((upload2) => {
  //     console.log(newTag);
  //     res.send(upload2);
  //   });
  // console.log(newTag);
  // });
  //}
  //   });
});

module.exports = router;
