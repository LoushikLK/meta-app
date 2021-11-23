
const express = require("express")
const router = express.Router()
const profileDb = require("../db/profileModule")
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
router.post("/", auth, async (req, res) => {
    console.log(req.body);
    try {
        const user = await profileDb.find({ profileName: { '$regex': req.body.name, '$options': 'i' } })

        if (user) {

            let userDetails = []

            user.forEach(element => {
                let user = {
                    profileName: element.profileName,
                    profileImage: element.profilePicture,
                    profileId: element._id,

                }
                userDetails.push(user)
            })


            res.status(200).json({
                message: userDetails

            })
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went Wrong Please try again After Sometime" })
    }

})

module.exports = router
