const express = require('express');
const app = express();
const router = express.Router()
const multer = require("multer")
const cloudinary = require("cloudinary").v2





app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


const auth = require("../middleware/auth")

const profiledata = require("../db/profileModule")


//cloudinary config////////////////////
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,


})

////////////////////////multer file upload config///////////////////////////////
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })



router.post("/", auth, upload.single('file'), async (req, res) => {

    if (req.body.details.id = null || undefined) {
        res.status(400).json({ message: "Please Login Again" })
        return
    }
    try {

        let userdetail = JSON.parse(req.body.details)
        console.log(userdetail);

        // console.log(req.body.details.id);

        const result = await cloudinary.uploader.upload(req.file.path);

        // console.log(result);


        if (req.body.details.id !== null && result) {

            let date = new Date().toLocaleDateString()

            const pushdata = { postUri: result.secure_url, postCaption: userdetail.caption, location: userdetail.location, postDate: date }

            let newdata = await profiledata.findOneAndUpdate({ _id: userdetail.id }, { $push: { post: pushdata } }, {
                new: true
            });
            console.log(newdata);

            res.status(200).json({ message: ' Sucessfully Posted Check Your Profile' })

        }

        // const data = await profiledata.findById(req.body.details,id)
        // // data.post.push(...items, { postUri: req.body.image, postCaption: req.body.caption, location: req.body.location, postDate: date })



    }
    catch (err) {
        res.status(400).json({ message: "Profile Could Not be Upload .Please Try again." })
        console.log(err);
    }



})

module.exports = router;