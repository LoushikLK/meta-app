const express = require('express');
const app = express();
const router = express.Router()

const profiledata = require("../db/profileModule")

router.get("/", async (req, res) => {

    const data = await profiledata.find()

    console.log("data fetched at frontend");
    res.send(data)

})
//////////////////////////for testing only///////////////////////////////
module.exports = router;