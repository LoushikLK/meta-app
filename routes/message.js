const express = require("express")
const app = express()

const router = express.Router()

const messagedb = require("../db/messageModule")
const profiledata = require("../db/profileModule")
//add

router.post("/", async (req, res) => {
    const newMessage = new messagedb(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get

router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await messagedb.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/getfriends", async (req, res) => {
    console.log("hii");
})

module.exports = router;