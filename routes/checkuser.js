
const express = require("express")
const router = express.Router()
const profileDb = require("../db/profileModule")
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
router.get("/", auth, async (req, res) => {
    try {

        res.status(200).json({ message: "User is authorised" })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went Wrong Please try again After Sometime" })
    }

})

module.exports = router