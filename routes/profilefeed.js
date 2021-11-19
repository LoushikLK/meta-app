const express = require('express');
const app = express();
const router = express.Router()
const auth = require("../middleware/auth")
const profiledata = require("../db/profileModule")

router.get("/timeline", auth, async (req, res) => {

    let userid = req.header("userid")

    console.log(userid + "hii user");

    try {

        if (userid) {

            const data = await profiledata.findById(userid)

            // console.log(data.post);

            let timelinepost = []

            data.post.map((value) => { return timelinepost.push({ userid, postid: value._id }) })

            console.log("data fetched at frontend");
            res.status(200).json({ message: timelinepost })
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong." })
    }




})
router.get("/card", auth, async (req, res) => {

    let userid = req.header("userid")

    // console.log(userid);

    try {

        if (userid) {

            const data = await profiledata.findById(userid)

            // console.log(data.post);

            let alluserpost = []

            data.post.map((value) => { return alluserpost.push(value.postUri) })

            console.log("data fetched at frontend");
            res.status(200).json({ message: alluserpost })
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong." })
    }




})
module.exports = router;