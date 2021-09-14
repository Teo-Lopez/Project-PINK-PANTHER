const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


//Meter aqui un if que te mande al registro si no tienes iniciada sesion?