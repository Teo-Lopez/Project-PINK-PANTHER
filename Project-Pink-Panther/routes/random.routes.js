const router = require("express").Router()

router.get('/', (req, res) => res.render('random'))

module.exports = router
