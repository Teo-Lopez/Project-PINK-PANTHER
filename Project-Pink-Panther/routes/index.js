module.exports = (app) => {
  app.use("/", require("./base.routes"));
  app.use("/", require("./auth.routes"));
  app.use("/upload", require("./upload.routes"));
  //app.use("/random", require("./random.routes"));
  app.use("/api", require("./api.routes"));
  app.use("/profile", require("./profile.routes"));
};
