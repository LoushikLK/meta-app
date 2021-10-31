const express = require("express")
const app = express();
const profileDb = require("../db/profileModule")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//sending mail for user verification
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const saltRound = 10;
router.post("/login", async (req, res) => {
    try {

        console.log(req.body);

        if (req.body.email && req.body.password != undefined || null) {
            console.log(req.body.email);
            let userDetail = await profileDb.findOne({ email: req.body.email })

            if (!userDetail) {
                console.log("user unauthorised");
                res.status(400).json({ message: "Email Does Not Exist. Sign up First." })
            }
            else if (userDetail) {

                console.log(userDetail._id);

                const matched = await bcrypt.compare(req.body.password, userDetail.password)

                if (!matched) {
                    console.log(`${req.body.email} is unauthorised`);
                    res.status(401).json({ message: "Email and Password Does Not Matched.Try Again." })
                }

                else {
                    let jwttoken = jwt.sign({ _id: userDetail._id }, process.env.LOGIN_JWT_SECRET, { expiresIn: "1h" });

                    // console.log(jwttoken);

                    console.log(`${req.body.email} is authorised`);


                    let mainuser = {
                        _id: userDetail._id,
                        profilePicture: userDetail.profilePicture,
                        coverPicture: userDetail.coverPicture,
                        profileName: userDetail.profileName,
                        followers: userDetail.followers.length,
                        following: userDetail.following.length,
                        post: userDetail.post.length,
                        bio: userDetail.bio,

                        about: [
                            {
                                location: userDetail.about[0].location,
                                profession: userDetail.about[0].profession,
                                relationshipStatus: userDetail.about[0].relationshipStatus,
                                gender: userDetail.about[0].gender
                            }
                        ]
                    }

                    res.status(200).cookie("authtoken", jwttoken).json({ message: mainuser })


                }


            }


        }


    }
    catch (err) {
        console.log(err);
    }
})



router.post("/signup", async (req, res) => {

    try {



        console.log(req.body);

        let email = req.body.email
        let firstname = req.body.firstName
        let lastname = req.body.lastName
        let password = req.body.password
        let gender = req.body.gender

        if (email && firstname && password && lastname && gender != undefined || null) {

            let checkemail = await profileDb.findOne({ email: email })

            if (checkemail) {

                console.log(" email already exist" + checkemail);
                res.status(400).json({ message: "Email Already Exist." })

                return
            }

            else {



                const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "https://developers.google.com/oauthplayground");

                oauth2Client.setCredentials({
                    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
                });

                const accessToken = oauth2Client.getAccessToken()


                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAuth2",
                        user: "gangmbj@gmail.com",
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                });


                var otp = Math.floor(1000 + Math.random() * 9000);

                console.log(otp);

                // let jwttoken = jwt.sign({ email: email }, process.env.EMAIL_JWT_SECRET, { expiresIn: "1h" });

                // console.log(jwttoken);

                const mailOptions = {
                    from: "gangmbj@gmail.com",
                    to: email,
                    subject: "META Email Confirm",
                    generateTextFromHTML: true,
                    text: `${otp}`,
                    html: `<b>Your OTP is${otp}</>`
                };


                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    transporter.close();
                });

                let hashotp = await bcrypt.hash(`${otp}`, saltRound)

                if (hashotp) {

                    let usercookiedata = {
                        email, firstname, lastname, gender, password, otp: hashotp
                    }

                    res.status(200).cookie("userdata", usercookiedata, { httpOnly: true }).json({ message: "email send to reciver" })

                    return
                }


            }

        }
        else {
            res.status(420).json({ message: "Please Fill all the field. " })
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something Went Wrong !" })
    }
})

router.post("/emailverification", async (req, res) => {

    try {
        // console.log(req.cookies)
        console.log(req.body);
        let userdata = req.cookies.userdata
        console.log(userdata);
        console.log(`${userdata.firstname} ${userdata.lastname}`);

        const verified = await bcrypt.compare(req.body.otp, req.cookies.userdata.otp)

        console.log(verified + " yes");

        if (!verified) {

            res.status(400).json({ message: "Wrong OTP .Check Your Email." })
            return

        }



        else if (verified) {



            bcrypt.hash(userdata.password, saltRound, (err, result) => {
                if (result) {
                    console.log(result);
                    let userProfileData = new profileDb({
                        email: userdata.email,
                        password: result,
                        profileName: `${userdata.firstname} ${userdata.lastname}`,
                        about: [{ gender: userdata.gender }]
                    })

                    userProfileData.save().then(() => {
                        console.log("new user saved to db");
                    }).catch((err) => {
                        console.log(err);
                    })


                    res.status(200).clearCookie("userdata").json({ message: `Welcome ${userdata.firstname}` })

                    return

                }
                else {
                    console.log("Could not Create hash Password");
                    res.status(400).json({ message: "Something Went Wrong. Try Again. " })
                }
            })
        }



    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something Went Wrong Please Enter Otp Again Or SignUp Again" })
    }
})

module.exports = router