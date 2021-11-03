const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.get("/", auth, async (req, res) => {

    // console.log(req.header("userid") + " is the userid");


    try {
        const user = await profiledata.findById(req.header("userid"));
        // console.log(user.followers);

        if (user.followers.length > 0) {
            res.status(200).json({
                message: user.following
            })
        } else {

            res.status(200).json({ message: "Try adding some people to see their post." })

        }

    }
    catch (err) {

        console.log(err);

        res.status(400).json({ message: "Something Went Wrong" })
    }

})

router.get("/sugesteduser", async (req, res) => {

    console.log("hi");
    try {
        const user = await profiledata.findById(req.header("userid"));

        // console.log(user.following);

        if (user.following.length > 0) {

            // console.log(user.following + " followings");

            let i;

            for (i = 0; i < user.following.length; i++) {

                let frienduser = await profiledata.findById(user.following[i].id)

                // console.log(frienduser);

                let j;

                for (j = 0; j < frienduser.following.length; j++) {

                    // console.log(frienduser.following[j].id);

                    if (user.following[i].id != frienduser.following[j].id) {
                        console.log("new sugesstions");

                        let newfriends = await profiledata.findById(frienduser.following[j].id)

                        console.log("new friends" + j);

                        // console.log(newfriends);

                        let newsugestion = []

                        newsugestion.push(newfriends)

                        // console.log("new sugesstion length" + newsugestion.length);



                        return res.status(200).json({ message: newsugestion })

                    }

                    return res.json({ message: "no more suggestion" })

                }

            }
        }
        else {

            let user = await profiledata.find()

            let i;

            for (i = 0; i > user.length - 6; i--) {

                let suggestuser = []
                suggestuser.push(user[i])
                res.status(200).json({ message: suggestuser })
            }
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something Went Wrong Please Login Again" })
    }

})

module.exports = router