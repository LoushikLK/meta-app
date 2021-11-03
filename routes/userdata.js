
const express = require("express")
const router = express.Router()
const profileDb = require("../db/profileModule")
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
router.get("/", auth, async (req, res) => {
    try {

        // console.log("main routes");


        let token = req.cookies.authtoken
        let verified = jwt.verify(token, process.env.LOGIN_JWT_SECRET)

        console.log(verified._id);

        const userprofiledata = await profileDb.findOne({ _id: verified._id })

        // console.log(userprofiledata);

        res.status(200).json({ message: userprofiledata })





    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went Wrong Please try again After Sometime" })
    }

})

module.exports = router