module.exports = app => {

    app.use("/", require("./base.routes"))
    app.use("/", require("./auth.routes"))
    app.use("/upload", require("./upload.routes"))
    app.use("/", require("./random.routes"))
    app.use("/", require("./api-routes") )
}