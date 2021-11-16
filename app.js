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

app.use(express());

app.use(require("cors")())

const PORT = process.env.PORT;

//mongoose connection
require("./db/ConnectDB")



//routes for endpoints
const profilefeed = require("./routes/profilefeed")
const usersignin = require("./routes/usersignin")
const checkuser = require("./routes/checkuser")
const postdetail = require("./routes/postDetail")
const profileDetails = require("./routes/profileDetails")
const postImage = require("./routes/postImageToDb")
const updateProfile = require("./routes/updateProfile")
const homefeed = require("./routes/homefeed")
const userUserIntraction = require("./routes/userUserIntraction")
const message = require("./routes/message")

app.use("/profilefeed", profilefeed)
app.use("/usersignin", usersignin)
app.use("/checkuser", checkuser)
app.use("/getpostdetails", postdetail)
app.use("/getuser", profileDetails)
app.use("/postimage", postImage)
app.use("/updateprofile", updateProfile)
app.use("/homefeed", homefeed)
app.use("/userintraction", userUserIntraction)
app.use("/message", message)








////////////////////////////////demo//////////////////////////////////////////
const profiledata = require("./db/profileModule")

app.get("/getfriend", async (req, res) => {

    const data = await profiledata.find()
    // console.log(data);
    console.log("hoo");
    res.json({ message: data.slice(data.length - 2, data.length) })
})




app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './social-client/build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}🗃️`);
})


