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

                let otp = Math.random().toFixed(4) * 10000

                console.log(otp);

                let jwttoken = jwt.sign({ email: email }, process.env.EMAIL_JWT_SECRET, { expiresIn: "1h" });

                console.log(jwttoken);

                const mailOptions = {
                    from: "gangmbj@gmail.com",
                    to: email,
                    subject: "META Email Confirm",
                    generateTextFromHTML: true,
                    text: `copy and paste the link in your browser to verify http://${process.env.HOST_NAME}:${process.env.PORT}/usersignin/emailverification/${jwttoken}`,
                    html: `<div style="
                    display: flex;
                    flex-direction: column;
                    background-color: #61b2ff;
                    width: 100%;
                    align-items: center;
                    padding: 2rem 0;
                ">
                        <h2 style="
                        color: #fcffff;">Click Below To Verify Your Account</h2>
                        <p>Thanks For registration,you are a amazing human being. Verify your email by click below. </p>
                        <button style="
                        background-color: #b4fff7;
                        padding: 0.5rem;
                        border-radius: .5rem;
                        border: none;
                    ">
                            <a style="
                            text-decoration: none;
                            color: #071d5a;"
                                href="http://${process.env.HOST_NAME}:${process.env.PORT}/usersignin/emailverification/${jwttoken}">Click
                                To Verify</a>
                        </button>
                
                    </div>
                            `
                };


                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    transporter.close();
                });

                let usercookiedata = {
                    email, firstname, lastname, gender, password
                }

                res.status(200).cookie("userdata", usercookiedata, { httpOnly: true }).json({ message: "email send to reciver" })

                return
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

router.get("/emailverification/:tokenid", async (req, res) => {

    try {
        console.log(req.cookies.userdata)
        let userdata = req.cookies.userdata
        console.log(`${userdata.firstName} ${userdata.lastName}`);
        const verified = jwt.verify(req.params.tokenid, process.env.EMAIL_JWT_SECRET);

        console.log(verified);

        if (!verified) {

            res.status(400).json({ message: "user not verified" })
            return

        }



        if (verified.email === userdata.email) {



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
                        console.log("save data to db");
                    }).catch((err) => {
                        console.log(err);
                    })


                    res.status(200).redirect("/login")

                    return

                }
                else {
                    console.log("Could not Create hash Password");
                    res.status(400).json({ message: "Something Went Wrong. Try Again. " })
                }
            })
        }
        else {
            console.log("cookies email and jwt email not match");
            return res.status(400).clearCookie().json({ message: "Something went wrong please Sign up again" })
        }


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something Went Wrong Please Enter Otp Again Or SignUp Again" })
    }
})

module.exports = router