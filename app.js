const express = require('express');
const app = express();
const path = require("path")
const cookieParser = require('cookie-parser')





//express tp parse cookies 
app.use(cookieParser())

//Express to use url encoded data and use json
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
//express to use static files in build folder
app.use(express.static(path.resolve(__dirname, './social-client/build')));



//configure environment veriable
require('dotenv').config()

const PORT = process.env.PORT;

//mongoose connection
require("./db/ConnectDB")



//routes for endpoints
const profileMain = require("./routes/profileMain")
const usersignin = require("./routes/usersignin")
const userdata = require("./routes/userdata")
const postdetail = require("./routes/postDetail")
const profileDetails = require("./routes/profileDetails")
const postImage = require("./routes/postImageToDb")
const updateProfile = require("./routes/updateProfile")
const homefeed = require("./routes/homefeed")
const followUnfollow = require("./routes/followUnfollow")

app.use("/profiledata", profileMain)
app.use("/usersignin", usersignin)
app.use("/userdata", userdata)
app.use("/getpostdetails", postdetail)
app.use("/getuser", profileDetails)
app.use("/postimage", postImage)
app.use("/updateprofile", updateProfile)
app.use("/homefeed", homefeed)
app.use("/followings", followUnfollow)



app.post("/test", async (req, res) => {

    try {

        console.log(req.body);

        const userdata = req.body

        const proffiledb = require("./db/profileModule")

        const mydata = new proffiledb({

            email: userdata.email,
            password: userdata.password,
            profileName: userdata.profileName,
            profilePicture: userdata.profilePicture,
            coverPicture: userdata.coverPicture,
            bio: userdata.bio,
            profileCreated: userdata.profileCreated,
            notification: [
                userdata.notification
            ],

            post: [

                {
                    postUri: userdata.post[0].postUri,
                    postCaption: userdata.post[0].postCaption,
                    liked: [
                        { name: userdata.post[0].liked[0].name }
                    ],
                    postDate: userdata.post[0].postDate,
                    postComments: [
                        {
                            name: userdata.post[0].postComments[0].name,
                            comments: userdata.post[0].postComments[0].comments
                        }
                    ]
                    , location: userdata.post[0].location

                }

            ],
            followers: [
                { name: userdata.followers[0].name },
                { name: userdata.followers[1].name },
                { name: userdata.followers[2].name },
            ],
            following: [
                { name: userdata.following[0].name },
                { name: userdata.following[1].name }

            ],
            privatePost: [
                {
                    postUri: userdata.privatePost[0].post

                }

            ],
            about:
            {
                location: userdata.about.location,
                profession: userdata.about.profession,
                relationshipStatus: userdata.about.relationshipStatus,
                gender: userdata.about.gender
            }


        })

        // console.log(mydata);

        mydata.save().then((result) => {
            console.log(result);
            res.send("user saved")
        })





    }
    catch (err) {
        console.log(err);
    }
})





app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './social-client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}🗃️`);
})