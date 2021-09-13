module.exports = (app) => {
  app.use("/", require("./base.routes"));
  app.use("/", require("./auth.routes"));
  app.use("/upload", require("./upload.routes"));

  app.use("/api", require("./api-routes"));
};
