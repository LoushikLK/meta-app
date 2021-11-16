const express = require('express');
const auth = require("../middleware/auth")
const router = express.Router()

const profiledata = require("../db/profileModule")

router.get("/", auth, async (req, res) => {

    // console.log(req.header("userid") + " is the userid");


    try {
        const user = await profiledata.findById(req.header("userid"));
        // console.log(user.followers);

        if (user.following.length > 0) {

            // console.log(user.following[0].id);

            //allfriends are following by user

            let allfriendsarray = []

            user.following.map((value) => {
                return allfriendsarray.push(value.id)
            })

            // $in for find multiple id result in an array///////////////////////

            let friendsData = await profiledata.find({ "_id": { "$in": allfriendsarray } });

            // console.log(allfriendsarray);

            let allpost = []



            const gethomefeedpost = async (array) => {


                return array.map((value) => {

                    if (value.post.length > 0) {


                        // console.log(value);




                        return value.post.map((items) => {

                            return allpost.push({ mainid: value._id, postid: items._id })

                        })

                        // for sending all data of post 

                        // return value.post.map((items) => {

                        //     return allpost.push({ mainid: value._id, postid: items._id, posturl: items.postUri, postdate: items.postDate, profilePhoto: value.profilePicture, name: value.profileName })
                        // })
                    }

                    return

                })


            }
            gethomefeedpost(friendsData)
            // console.log(allpost.reverse());

            if (allpost.length > 0) {
                // console.log(allpost);
                return res.status(200).json({ message: allpost.reverse() })

            }

            res.status(400).json({ message: "Try adding some people as friends to see their post." })


        }

        return res.status(400).json({ message: "Try adding some people to see their post." })



    }
    catch (err) {

        console.log(err);

        res.status(400).json({ message: "Something Went Wrong" })
    }

})

router.get("/sugesteduser", auth, async (req, res) => {

    try {
        const user = await profiledata.findById(req.header("userid"));
        const alluser = await profiledata.find()

        // console.log(user.following.length);

        if (user.following.length > 5) {

            let friends = []

            user.following.forEach((elem) => { return friends.push(elem.id) })

            // console.log(friends);


            ///////////////////////data of friends user is following///////////

            let friendsData = await profiledata.find({ "_id": { "$in": friends } });

            // console.log(friendsData);

            let suggestuser = async (array) => {
                // console.log(array);

                let newsuggestion = []

                array.forEach((elem) => {


                    // console.log(elem.following);


                    if (elem.following.length > 0) {

                        elem.following.forEach(async (item) => {
                            // console.log(item);

                            newsuggestion.push(item.id)


                        })
                    }


                })
                // console.log(newsuggestion);

                let result = newsuggestion.filter(o1 => !friends.some(o2 => o1 === o2));

                // console.log(result);

                let newuserdata = await profiledata.find({ "_id": { "$in": result } });

                // console.log(newuserdata + "newuser data");

                let mysuggestion = newuserdata.slice(0, 6)

                return res.status(200).json({ message: mysuggestion })
            }

            return suggestuser(friendsData)
        }


        // console.log("hiii");


        let followingid = user.following.map((value) => { return value.id })

        // console.log(followingid);


        let myarray = alluser.map((value) => { return value._id })

        // console.log(myarray);


        // myarray.map((value) => {

        //     return followingid.map((items) => {


        //         if (myarray.indexOf(items) === -1) {
        //             console.log();
        //         }
        //         return


        //     })
        // })

        // let i;

        // for (i = 0; i < myarray.length; i++) {
        //     if (followingid.indexOf(myarray[i]) === -1) {
        //         console.log(myarray[i]);
        //     }
        //     else {
        //         return
        //     }

        // }





        let newsuggestion = alluser.reverse().slice(0, 6)


        // console.log(myarray);
        // console.log(newsuggestion);

        res.status(200).json({ message: newsuggestion })


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something Went Wrong Please Login Again" })
    }

})

module.exports = router