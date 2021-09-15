//prueba de mapa
const router = require("express").Router();


router.get('/', (req, res) => {
    
    res.render("map/test")

})

module.exports = router;
