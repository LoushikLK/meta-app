const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otpCode: Number,
    profileName: {
        type: String,
        unique: true,
        required: true
    },
    profilePicture: {
        type: String
    },
    coverPicture: {
        type: String
    },
    bio: {
        type: String
    },
    profileCreated: {
        type: String,

    },
    notification: [
        { type: String }
    ],

    post: [

        {
            postUri: String,
            postCaption: String,
            liked: [
                { name: String }
            ],
            postDate: String,
            postComments: [
                {
                    name: String,
                    comments: String
                }
            ]
            , location: String

        }

    ],
    followers: [
        { id: String },
    ],
    following: [
        { id: String }

    ],
    privatePost: [
        {
            postUri: String,
            postCaption: String,
            liked: [
                { name: String }
            ],
            postDate: String,
            postComments: [
                {
                    name: String,
                    comments: String
                }
            ]
            , location: String

        }

    ],
    about:
    {
        location: {
            type: String,

        },
        profession: {
            type: String,

        },
        relationshipStatus: {
            type: String
        },
        gender: String
    }


})


const porfileData = mongoose.model("userProfile", profileSchema);

module.exports = porfileData