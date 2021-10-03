const router = require('express').Router()

const Tag = require('../models/Tag.model')
const Upload = require('../models/Upload.model')

router.get('/uploads', (req, res) => {
  Upload.find(req.query)
    .then((upload) => res.json(upload))
    .catch((err) => console.log(err))
})

router.get('/search', (req, res) => {
  const name =
    req.query.name.charAt(0) === '#'
      ? req.query.name.substr(1)
      : '#' + req.query.name
  Tag.find({ name: new RegExp(name) })
    .then((tags) =>
      Promise.all(
        tags.map((tag) => Upload.find({ tagId: tag._id }).populate('tagId'))
      )
    )
    .then((uploads) => res.json({ uploads }))
    .catch((err) => console.log(err))
})

module.exports = router
