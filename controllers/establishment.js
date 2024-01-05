const User = require('../models/user');

exports.connect = async (req, res, next) => {
    //post request with the body of the request containing phone number, and the public key
    //create a new user
    const phone = req.body.phone;
    const public_key = req.body.public_key;
   
    //create a new user
    const user = new User({
        phone: phone,
        public_key: public_key
    });
    try{
    //save the user
        result = await user.save();
        //get all public keys from users but the current user
        const users = await User.find({_id: {$ne: result._id}});
        //send all public keys to the user
        res.status(201).json({
            message: 'User created',
            users: users.map(user => {
                return {public_key: user.public_key};
            })
        });

    }catch(err){
        console.log(err);
    }
};

//check if the user is in the database
exports.check = async (req, res, next) => {
    //post request with the body of the request containing phone number
    //create a new user
    const phone = req.body.phone;
   
    //find user with phone number
    try{
    //save the user
        result = await user.save();
        //get all public keys from users but the current user
        const users = await User.find({_id: {$ne: result._id}});
        //send all public keys to the user
        res.status(201).json({
            message: 'User created',
            users: users.map(user => {
                return {public_key: user.public_key};
            })
        });

    }catch(err){
        console.log(err);
    }
};