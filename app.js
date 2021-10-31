const express = require('express');
const app = express();
const path = require("path")
const cookieParser = require('cookie-parser')


//express tp parse cookies 
app.use(cookieParser())

//Express to use url encoded data and use json
app.use(express.json({ limit: '50mb' }));
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

app.use("/profiledata", profileMain)
app.use("/usersignin", usersignin)
app.use("/userdata", userdata)
app.use("/getpostdetails", postdetail)
app.use("/getuser", profileDetails)
app.use("/postimage", postImage)
app.use("/updateprofile", updateProfile)


app.get("/test", async (req, res) => {

    try {

        console.log("getting all profile");

        const profileDb = require("./db/profileModule")

        const data = await profileDb.find()

        // console.log(data);

        res.json({ message: data })
    }
    catch (err) {
        console.log(err);
    }
})





app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './social-client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
})