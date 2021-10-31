const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.post("/", auth, async (req, res) => {


    try {
        const data = await profiledata.findOne({ _id: req.body._id })

        // console.log(data);

        let i = 0;

        // console.log(data.post);

        for (i = 0; i < data.post.length; i++) {
            if (data.post[i]._id == req.body.postid && data.post.length > 0) {

                let postdata = {
                    profilename: data.profileName,
                    profileimg: data.profilePicture,
                    post: data.post[i]

                }

                // console.log(postdata);

                res.status(200).json({ message: postdata })

            }
            else {
                console.log("no match");
                return
            }

        }


    }
    catch (err) {

        console.log(err);

        res.status(400).json({ message: "Something Went Wrong" })
    }

})

module.exports = router