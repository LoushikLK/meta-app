const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.post("/follow", auth, async (req, res) => {

    // console.log(req.header("userid") + " is the userid");

    try {
        if (req.body && req.body.id && req.body.interectId) {

            console.log(req.body);

            console.log("at follow");

            const user = await profiledata.findOneAndUpdate({ _id: req.body.id }, { $push: { following: { id: req.body.interectId } } }, {
                new: true
            })

            console.log(user);
        }
        else {
            return res.status(404).json({ message: "Please login again." })
        }

    }
    catch (err) {

        console.log(err);

        res.status(400).json({ message: "Something Went Wrong" })
    }

})

router.post("/unfollow", auth, async (req, res) => {

    try {
        console.log(req.body);

        console.log("hi at unfollow");

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something Went Wrong Please Login Again" })
    }

})

module.exports = router