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

        // console.log(req.body);

        if (req.body.email && req.body.password != undefined || null) {
            // console.log(req.body.email);
            let userDetail = await profileDb.findOne({ email: req.body.email })

            if (!userDetail) {
                console.log("user unauthorised");
                res.status(400).json({ message: "Email Does Not Exist. Sign up First." })
            }
            else if (userDetail) {

                // console.log(userDetail._id);

                const matched = await bcrypt.compare(req.body.password, userDetail.password)

                if (!matched) {
                    console.log(`${req.body.email} is unauthorised`);
                    res.status(401).json({ message: "Email and Password Does Not Matched.Try Again." })
                }

                else {
                    let jwttoken = jwt.sign({ _id: userDetail._id }, process.env.LOGIN_JWT_SECRET, { expiresIn: "1h" });

                    // console.log(jwttoken);

                    console.log(`${req.body.email} is authorised`);

                    // console.log(userDetail);
                    let mainuser = {
                        _id: userDetail._id,
                        profilePicture: userDetail.profilePicture,
                        coverPicture: userDetail.coverPicture,
                        profileName: userDetail.profileName,
                        followers: userDetail.followers.length,
                        following: userDetail.following.length,
                        post: userDetail.post.length,
                        bio: userDetail.bio,
                        new: userDetail.new,

                        about:
                        {
                            location: userDetail.about.location,
                            profession: userDetail.about.profession,
                            relationshipStatus: userDetail.about.relationshipStatus,
                            gender: userDetail.about.gender
                        }

                    }

                    res.status(200).cookie("authtoken", jwttoken).json({ message: mainuser })



                }


            }


        }


    }
    catch (err) {
        console.log(err);
        console.log("data not sent");
    }
})
router.post("/loginmobile", async (req, res) => {
    try {

        // console.log(req.body);

        if (req.body.email && req.body.password != undefined || null) {
            // console.log(req.body.email);
            let userDetail = await profileDb.findOne({ email: req.body.email })

            if (!userDetail) {
                console.log("user unauthorised");
                res.status(400).json({ message: "Email Does Not Exist. Sign up First." })
            }
            else if (userDetail) {

                // console.log(userDetail._id);

                const matched = await bcrypt.compare(req.body.password, userDetail.password)

                if (!matched) {
                    console.log(`${req.body.email} is unauthorised`);
                    res.status(401).json({ message: "Email and Password Does Not Matched.Try Again." })
                }

                else {
                    let jwttoken = jwt.sign({ _id: userDetail._id }, process.env.LOGIN_JWT_SECRET, { expiresIn: "11100001100011h" });

                    // console.log(jwttoken);

                    console.log(`${req.body.email} is authorised`);

                    // console.log(userDetail);
                    let mainuser = {
                        _id: userDetail._id,
                        profilePicture: userDetail.profilePicture,
                        coverPicture: userDetail.coverPicture,
                        profileName: userDetail.profileName,
                        followers: userDetail.followers,
                        following: userDetail.following,
                        post: userDetail.post.length,
                        bio: userDetail.bio,
                        new: userDetail.new,

                        about:
                        {
                            location: userDetail.about.location,
                            profession: userDetail.about.profession,
                            relationshipStatus: userDetail.about.relationshipStatus,
                            gender: userDetail.about.gender
                        }

                    }

                    res.status(200).cookie("authtoken", jwttoken).json({ message: mainuser })



                }


            }


        }


    }
    catch (err) {
        console.log(err);
        console.log("data not sent");
    }
})


router.post("/signup", async (req, res) => {



    const userValidate = RegExp(/^[a-zA-Z0-9_]+$/);
    const emailValidate = RegExp(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    );

    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    if (email === null || password === null || username === null) {

        res.status(400).json({ message: "Please fill all the field." })
        return
    }
    else if (userValidate.test(username) === false) {
        res.status(400).json({ message: "Username can only contain letter,number,_" })
        return
    }
    else if (emailValidate.test(email) === false) {
        res.status(400).json({ message: "Enter a valid email." })
        return
    }


    try {



        console.log(email);




        let checkemail = await profileDb.findOne({ email: email })

        let checkusername = await profileDb.findOne({ profileName: username })


        if (checkemail) {

            // console.log(" email already exist" + checkemail);
            res.status(400).json({ message: "Email Already Exist." })

            return
        }

        else if (checkusername) {

            // console.log("username already exist" + checkusername);
            res.status(400).json({ message: "Username Already Exist." })

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
                html: `<b>Your OTP is ${otp}</>`
            };


            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, response) => {
                error ? console.log(error) : console.log(response);
                transporter.close();
            });

            let hashotp = await bcrypt.hash(`${otp}`, saltRound)

            if (hashotp) {

                let usercookiedata = {
                    email, username, password, otp: hashotp
                }

                res.status(200).cookie("userdata", usercookiedata, { httpOnly: true }).json({ message: "email send to reciver" })

                return
            }


        }


    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something Went Wrong !" })
    }
})

router.post("/emailverification", async (req, res) => {
    let userdata = req.cookies.userdata

    const userValidate = RegExp(/^[a-zA-Z0-9_]+$/);
    const emailValidate = RegExp(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    );

    if (userValidate.test(userdata.username) === false) {
        res.status(400).json({ message: "Username can only contain letter,number,_" })
        return
    }
    else if (emailValidate.test(userdata.email) === false) {
        res.status(400).json({ message: "Enter a valid email." })
        return
    }

    try {
        // console.log(req.cookies)
        // console.log(req.body);
        console.log(userdata);


        const verified = await bcrypt.compare(req.body.otp, req.cookies.userdata.otp)

        // console.log(verified + " yes");

        if (!verified) {

            res.status(400).json({ message: "Wrong OTP .Check Your Email." })
            return

        }


        else if (verified) {



            let result = await bcrypt.hash(userdata.password, saltRound)
            if (result) {
                // console.log(result);
                let userProfileData = new profileDb({
                    email: userdata.email,
                    password: result,
                    profileName: userdata.username,
                    new: true,
                    profileCreated: new Date(Date.now()).toLocaleDateString()
                })

                let response = await userProfileData.save()

                if (response) {

                    let jwttoken = jwt.sign({ _id: response._id }, process.env.LOGIN_JWT_SECRET, { expiresIn: "2h" });

                    res.status(200).cookie("authtoken", jwttoken).clearCookie("userdata").json({ message: `Welcome ${userdata.firstname}` })


                    return
                }



                else {
                    console.log("Could not Create hash Password");
                    res.status(400).json({ message: "Something Went Wrong. Try Again. " })
                }
            }


        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something Went Wrong Please Enter Otp Again Or SignUp Again" })
    }
})
router.get("/logout", (req, res) => {
    res.clearCookie("authtoken").json({ message: "you are logged out!" })
})
router.post("/updatepassword", async (req, res) => {

    console.log("update password");
    // console.log(req.body);
    try {

        if (req.body.email !== null && req.body.email !== undefined) {

            const user = await profileDb.findOne({ email: req.body.email })

            // console.log(user);

            if (!user) {
                // console.log("email doesnot exist");

                res.status(400).json({ message: "Email doesnot exist try again with a correct one." })
            }
            else if (user) {

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



                const mailOptions = {
                    from: "gangmbj@gmail.com",
                    to: req.body.email,
                    subject: "META password change.",
                    generateTextFromHTML: true,
                    text: `${otp}`,
                    html: `<b>Your OTP is ${otp}</>`
                };


                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    transporter.close();
                });

                let hashotp = await bcrypt.hash(`${otp}`, saltRound)

                if (hashotp) {

                    let updatepassword = {
                        email: req.body.email, otp: hashotp
                    }

                    res.status(200).clearCookie("userData").clearCookie("authtoken").cookie("updatepassword", updatepassword).json({ message: `Hello ${user.profileName}` })
                    return
                }




            }

            return
        }
        else {

            res.status(400).json({ message: "Please Enter User email." })
        }


    } catch (error) {

        console.log(error);

        res.status(400).json({ message: "Could not update your password .Try again." })
    }



})
router.post("/setnewpassword", async (req, res) => {

    console.log("update new password");
    // console.log(req.cookies);

    if (req.body.password === null) {
        res.status(400).json({ message: "Please enter a new password" })
    }
    else if (req.body.otp === null) {
        res.status(400).json({ message: "Please enter a valid OTP" })

    }


    try {

        bcrypt.compare(req.body.otp, req.cookies.updatepassword.otp, async (err, match) => {

            if (err) {
                res.status(400).json({ message: "OTP provided is worng or not valid .Try again." })
            }

            let hash = await bcrypt.hash(req.body.password, saltRound)

            if (hash) {

                const user = await profileDb.findOneAndUpdate({ email: req.cookies.updatepassword.email }, { password: hash })

                if (!user) {
                    res.status(400).clearCookie("updatepassword").json({ message: "User doesnot exist .Try again." })
                }
                res.status(200).clearCookie("updatepassword").json({ message: "Password is changed" })
            }

        })



    } catch (error) {

        // console.log(error);

        res.status(400).json({ message: "Could not update your password .Try again." })
    }



})
module.exports = router