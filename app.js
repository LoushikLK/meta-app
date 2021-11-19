const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
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

app.use(cors())

app.use(express());



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



//////////////////////////////socket io////////////////////////////////////////





const io = require("socket.io")(server)


let users = []



io.on('connection', (socket) => {
    // console.log('a user connected');
    socket.on('new-user-joined', details => {
        // console.log(details);

        details = JSON.parse(details)

        users.push(details.name)

        // console.log(users);

        // let unique = users.filter((item, i, ar) => ar.indexOf(item) === i);
        users = users.filter((item, i, ar) => ar.indexOf(item) === i);

        console.log(users);

        // // users[socket.id] = name;
        socket.broadcast.emit('user-joined', JSON.stringify({ details, length: users.length }));

    });

    socket.on("send-chat-message", data => {
        console.log(data);
        io.emit("recieve-chat-message", data)
    })
});

server.listen(PORT, () => {
    console.log(`socket server started at port ${PORT}`)
})

