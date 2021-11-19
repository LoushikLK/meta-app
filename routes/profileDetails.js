const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.post("/", auth, async (req, res) => {


    try {
        const data = await profiledata.findOne({ _id: req.body._id })

        // console.log(data);

        res.status(200).json({ message: data })

    }
    catch (err) {

        console.log(err);

        res.status(400).json({ message: "Something Went Wrong" })
    }

})

router.post("/friends", auth, async (req, res) => {
    try {

        // console.log(req.body);

        if (req.body._id) {
            let data = await profiledata.findById(req.body._id)

            // console.log(data);

            res.status(400).json({ message: data.following })
        }

    } catch (error) {
        console.log(error);
    }
})

router.get("/:userName", async (req, res) => {
    console.log(req.params.userName);
    if (req.params.userName == null) {
        return
    }
    try {
        const user = await profiledata.findOne({ profileName: req.params.userName })

        // console.log(user);

        if (user) {
            let userdata = {
                profileName: user.profileName,
                profilePicture: user.profilePicture,
                coverPicture: user.coverPicture,
                bio: user.bio,
                _id: user._id,
                following: user.following.length,
                followers: user.followers.length,
                post: user.post.length,
                about: user.about,
            }
            res.status(200).json({ message: userdata })
            return
        }
        res.status(400).json({ message: "User does not exist." })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" })
    }
})

module.exports = router