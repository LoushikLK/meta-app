const jwt = require('jsonwebtoken')
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')


//express tp parse cookies 
app.use(cookieParser())

const SECRET_KEY = process.env.LOGIN_JWT_SECRET

const auth = async (req, res, next) => {
    try {


        // console.log(req.cookies);
        // console.log(req.cookies.authtoken);
        if (req.cookies.authtoken === undefined || req.cookies.authtoken === null) {

            console.log('no cookies');

            // res.json({ message: "no auth token" })

            res.status(400).json({ message: "Please Login Again" })

            // res.redirect("/login")
            // res.status(200).redirect("/login")

            return
        }
        else {


            let token = req.cookies.authtoken
            let verified = jwt.verify(token, SECRET_KEY)
            // console.log(verified);
            if (verified) {
                // console.log('verified');
                next()
            }
            else {
                console.log('not verified login again');
                res.status(403).json({ message: "You are not authorised Please log in." })

            }

        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Please login again" })
    }
}


module.exports = auth