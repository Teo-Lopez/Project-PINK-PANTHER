const Tag = require("./models/Tag.model");
const Upload = require("./models/Upload.model");


const {tagName} = req.body
Tag
.findOne({tagName})
.then(theTag => {
    if (theTag){
    console.log("tag encontrado")

const {tagName, img}
return Upload.create({tagName, img})
} else {
    return Tag.create()
}


})


//get req.body.tagName
//Tag.find(tagName)
/*
    if(encuentraTag) {
        Upload.create(tagID)
        .then(res.render())
    } else {
        Tag.create(tagName)
        .then(createdTag => {
            Upload.create(createdTag)

        })
    }


*/