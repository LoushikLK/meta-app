const router = require("express").Router();
const messagedb = require("../db/messageModule")
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

module.exports = router;