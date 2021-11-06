const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.put("/follow", auth, async (req, res) => {

    // console.log(req.header("userid") + " is the userid");

    try {
        if (req.body && req.body.id && req.body.interectId) {

            const alreadyfollowing = await profiledata.findById(req.body.id)

            // console.log(alreadyfollowing.following);

            let myarr = []

            alreadyfollowing.following.map((value) => {
                myarr.push(value.id)
            })

            // console.log(myarr);

            if (myarr.indexOf(req.body.interectId) !== -1) {

                console.log("already following");
                return
            }
            // console.log(req.body);

            console.log("at follow");

            const updatefollowing = await profiledata.findOneAndUpdate({ _id: req.body.id }, { $push: { following: { id: req.body.interectId } } }, {
                new: true
            })
            const updatefollowers = await profiledata.findOneAndUpdate({ _id: req.body.interectId }, { $push: { followers: { id: req.body.id } } }, {
                new: true
            })

            // console.log(user);

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

router.put("/unfollow", auth, async (req, res) => {

    try {
        if (req.body && req.body.id && req.body.interectId) {

            console.log(req.body.interectId + "interect id");

            console.log("at unfollow");

            // const user = await profiledata.findById(req.body.id)

            // console.log(user.following);

            const unfollowuser = await profiledata.updateOne({ _id: req.body.id }, { "$pull": { "following": { "id": req.body.interectId } } }, { safe: true, multi: true })

            // console.log(unfollowuser);

            const followersunfollow = await profiledata.updateOne({ _id: req.body.interectId }, { "$pull": { "followers": { "id": req.body.id } } }, { safe: true, multi: true })

            // console.log(followersunfollow);

            res.status(200).json({ message: `You Unfollow a person` })
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

module.exports = router