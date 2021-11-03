const express = require('express');
const app = express();
const router = express.Router()
const multer = require("multer")
const cloudinary = require("cloudinary").v2


app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const auth = require("../middleware/auth")

const profiledata = require("../db/profileModule")

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })



router.post("/", auth, upload.single("file"), async (req, res) => {


    // console.log(req.body.details)
    if (req.body.details.id = null || undefined) {
        res.status(400).json({ message: "Add your Details" })
        return
    }

    try {
        let userdata = JSON.parse(req.body.details)
        // console.log(userdata);

        console.log("profile picture update");

        const result = await cloudinary.uploader.upload(req.file.path);


        const data = await profiledata.findByIdAndUpdate(userdata.id, { bio: userdata.bio, about: { location: userdata.location, profession: userdata.profession, relationshipStatus: userdata.relationStatus }, profilePicture: result.secure_url }, {})



        // console.log(data);

        if (data) {
            res.status(200).json({ message: "Thank You For Informetion" })
        }
        else {
            res.status(400).json({ message: "Something Went Wrong Please Try Again ." })
        }

    }
    catch (err) {
        res.status(400).json({ message: "Profile Could Not be Upload .Please Try again." })
        console.log(err);
    }


})


module.exports = router;