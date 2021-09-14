module.exports = (app) => {
  app.use("/", require("./base.routes"));
  app.use("/", require("./auth.routes"));
  app.use("/fotograma", require("./upload.routes"));
  app.use("/api", require("./api.routes"));
  app.use("/perfil", require("./profile.routes"));
  app.use("/tendencias", require("./trends.route.js"));
};
