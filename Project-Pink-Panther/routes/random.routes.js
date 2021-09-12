const router = require("express").Router()

router.get('/random', (req, res) => res.render('random'))

module.exports = router
