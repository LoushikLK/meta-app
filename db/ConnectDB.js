const mongoose = require('mongoose')

const url = process.env.MONGO_URI;

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('connected to mongodb database');
}).catch((err) => {
    console.log(err + " error while connecting to database");
})


module.exports = mongoose.connect;