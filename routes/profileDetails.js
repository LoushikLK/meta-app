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

module.exports = router