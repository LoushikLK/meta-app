const express = require('express');
const app = express();
const router = express.Router()


const auth = require("../middleware/auth")

const profiledata = require("../db/profileModule")


router.post("/", auth, async (req, res) => {


    try {
        console.log(req.body.profilePhoto);

        console.log("hi update");
        const data = await profiledata.findByIdAndUpdate(req.body.id, { bio: req.body.bio, about: { location: req.body.location, profession: req.body.profession, relationshipStatus: req.body.relationStatus }, profilePicture: req.body.profilePhoto, coverPicture: req.body.coverPhoto }, {})



        console.log(data);

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