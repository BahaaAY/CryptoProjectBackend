
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.connect = async (req, res, next) => {
    //post request with the body of the request containing phone number, and the public key
    //create a new user
    const phone = String(req.body.phone);
    const password = String(req.body.password);
    const public_key = req.body.public_key;

    //hash the password with bcrypt to store it in the database securely 
   const hashedPW = await bcrypt.hash(password, 12);
    //create a new user
    const user = new User({
        phone: phone,
        password: hashedPW,
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
    const phone = String(req.body.phone);
    console.log(phone);

    try{
    //find user with phone number
        let user = await User.findOne({phone: phone});
        //if user exists
        if(user)
        {
                if(user){
                    //if user exists
                    res.status(201).json({
                        message: 'User exists',
                        public_key: user.public_key
                    });
                }else{
                    //if user does not exist
                    res.status(201).json({
                        message: 'User does not exist'
                    });
                }
        }else{
            //user doesnt exist
            res.status(404).json({
                message: 'User does not exist'
            });
        }
    }catch(err){
        console.log(err);
    }
};