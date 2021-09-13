const router = require("express").Router()

const Upload = require("../models/Upload.model");

router.get('/', (req, res) => {

    const {currentTag} = req.query
    Upload
    .find({tag: currentTag})
    .then(allUpload => res.render('upload/list-tag'), { allUpload })
    .catch(err => console.log(err))

})

module.exports = router;




