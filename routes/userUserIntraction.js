const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.put("/follow", auth, async (req, res) => {

    // console.log(req.header("userid") + " is the userid");

    try {
        if (req.body && req.body.myname && req.body.interectname) {

            const alreadyfollowing = await profiledata.findOne(req.body.myname)

            // console.log(alreadyfollowing.following);

            let myarr = []

            alreadyfollowing.following.map((value) => {
                myarr.push(value.name)
            })

            // console.log(myarr);

            if (myarr.indexOf(req.body.interectname) !== -1) {

                console.log("already following");
                return
            }
            // console.log(req.body);

            console.log("at follow");

            const updatefollowing = await profiledata.findOneAndUpdate({ profileName: req.body.myname }, { $push: { following: { name: req.body.interectname } } }, {
                new: true
            })

            const updatefollowers = await profiledata.findOneAndUpdate({ profileName: req.body.interectname }, { $push: { followers: { name: req.body.myname }, notification: `${updatefollowing} started following you.` } }, {
                new: true
            })

            // console.log(user);

            res.status(200).json({ message: "following" })

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
        if (req.body && req.body.myname && req.body.interectname) {

            // console.log(req.body.interectId + "interect id");

            console.log("at unfollow");

            // const user = await profiledata.findById(req.body.id)

            // console.log(user.following);

            const unfollowuser = await profiledata.updateOne({ profileName: req.body.myname }, { "$pull": { "following": { "name": req.body.interectname } } }, { safe: true, multi: true })

            // console.log(unfollowuser);

            const followersunfollow = await profiledata.updateOne({ profileName: req.body.interectname }, { "$pull": { "followers": { "name": req.body.myname } } }, { safe: true, multi: true })

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


router.put("/liked", auth, async (req, res) => {
    // console.log(req.header("mainuser"));
    // console.log(req.body);

    try {
        const mainuser = await profiledata.findById(req.header("mainuser"))

        if (req.body.userid && req.body.postid) {

            profiledata.findOneAndUpdate(
                { _id: req.body.userid },
                { $push: { "post.$[outer].liked": { "name": mainuser.profileName } } },
                { "arrayFilters": [{ "outer._id": req.body.postid }] }, function (err, response) {


                    if (response) {
                        profiledata.findOneAndUpdate({ _id: req.body.userid }, { $push: { notification: `${mainuser.profileName} liked your photo.` } }, {
                            new: true
                        }).then(() => {

                            res.status(200).json({ message: `You Liked ${response.profileName}'s photo.` })
                        })

                    }

                })



        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong try again." })

    }

})
router.put("/unliked", auth, async (req, res) => {
    console.log(req.header("mainuser"));
    console.log(req.body);

    try {
        const mainuser = await profiledata.findById(req.header("mainuser"))
        if (req.body.userid && req.body.postid) {

            profiledata.findOneAndUpdate(
                { _id: req.body.userid },
                { $pull: { "post.$[outer].liked": { name: mainuser.profileName } } },
                { "arrayFilters": [{ "outer._id": req.body.postid }] }, function (err, response) {

                    if (response) {
                        res.status(200).json({ message: `Your Like removed ${response.profileName}'s photo.` })
                    }

                }
            );



        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong try again." })

    }

})
router.put("/comment", auth, async (req, res) => {
    // console.log(req.header("mainuser"));
    // console.log(req.body);

    try {
        const mainuser = await profiledata.findById(req.header("mainuser"))

        // console.log(mainuser);

        if (req.body.userid && req.body.postid) {

            profiledata.findOneAndUpdate(
                { _id: req.body.userid },
                { $push: { "post.$[outer].postComments": { "name": mainuser.profileName, comments: req.body.textcomment } } },
                { "arrayFilters": [{ "outer._id": req.body.postid }] }, function (err, response) {


                    if (response) {
                        profiledata.findOneAndUpdate({ _id: req.body.userid }, { $push: { notification: `${mainuser.profileName} commented ${req.body.textcomment}.` } }, {
                            new: true
                        }).then(() => {
                            res.status(200).json({ message: `You Commented on  ${response.profileName}'s photo.` })
                        })

                    }

                })


        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong try again." })

    }

})
router.put("/removecomment", auth, async (req, res) => {
    console.log(req.header("mainuser"));
    console.log(req.body);

    try {
        const mainuser = await profiledata.findById(req.header("mainuser"))

        if (req.body.userid && req.body.postid) {

            profiledata.findOneAndUpdate(
                { _id: req.body.userid },
                { $pull: { "post.$[outer].postComments": { "name": mainuser.profileName, comments: req.body.textcomment } } },
                { "arrayFilters": [{ "outer._id": req.body.postid }] }, function (err, response) {


                    if (response) {
                        res.status(200).json({ message: `Your Comment removed  from  ${response.profileName}'s photo.` })
                    }

                })

        }
    } catch (error) {

        res.status(400).json({ message: "Something went wrong try again." })
    }

})
router.get("/notifications", auth, async (req, res) => {

    try {
        let userid = req.header("userid")

        const user = await profiledata.findById(userid)

        if (user) {
            // console.log(user);
            res.status(200).json({ message: user.notification })
        }



    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something Went Wrong.Try Again Later." })
    }
})


module.exports = router