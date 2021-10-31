const express = require('express');
const app = express();
const router = express.Router()


const auth = require("../middleware/auth")

const profiledata = require("../db/profileModule")


router.post("/", auth, async (req, res) => {


    try {



        // console.log(req.body);

        if (req.body.id !== null && req.body.image !== null) {


            // console.log(data.post);

            let date = new Date().toLocaleDateString()

            const pushdata = { postUri: req.body.image, postCaption: req.body.caption, location: req.body.location, postDate: date }

            // data.post.push(...items, { postUri: req.body.image, postCaption: req.body.caption, location: req.body.location, postDate: date })

            let newdata = await profiledata.findOneAndUpdate({ _id: req.body.id }, { $push: { post: pushdata } }, {
                new: true
            });


            // console.log(newdata);



            res.status(200).json({ message: ' Sucessfully Posted Check Your Profile' })
        }
    }
    catch (err) {
        res.status(400).json({ message: "Profile Could Not be Upload .Please Try again." })
        console.log(err);
    }



})

module.exports = router;