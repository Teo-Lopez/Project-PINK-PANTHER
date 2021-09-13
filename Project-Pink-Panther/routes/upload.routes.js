const router = require("express").Router()

const { findByIdAndRemove } = require("../models/Upload.model");
const Upload = require("../models/Upload.model");

router.get('/', (req, res) => {

    const {currentTag} = req.query
    Upload
    .find({tag: currentTag})
    .then(allUpload => res.render('upload/list-tag'), { allUpload })
    .catch(err => console.log(err))

})

router.post('/delete/:id', (req, res) => {

    const {id} = req.params

    Upload
    .findByIdAndRemove(id)
    .then(()=> res.redirect('/'))
    .catch(err => console.log(err))


})

module.exports = router;




