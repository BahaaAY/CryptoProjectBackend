const User = require('../models/user');

const Message = require('../models/message');


exports.sendMessage = async (req, res, next) =>
{
    //post request with the body of the request containing public key of the user and public key of receiver  
    //and the Aes Key encrypted with the public key of the receiver and the message encrypted with the Aes Key
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const AesKey = req.body.AesKey;
    const message = req.body.message;
    // create a new message 
    const newMessage = new Message({
        sender_key: sender,
        receiver_key: receiver,
        AesKey: AesKey,
        message: message
    })
    // save the message
    await newMessage.save();
    // find the sender
    let user = await User.findOne({public_key: sender});
    // add the message to the messages of the sender
    user.messages.push(newMessage);
    // save the user
    await user.save();
    //send response 
    res.status(201).json({
        message: 'Message sent'
    });
    
};

exports.readOutBox = async (req, res, next) =>{

    //get all messages of the user
    const sender = req.body.sender;
    //find the user
    let user = await User.findOne({public_key: sender}).populate('messages');
    //get the messages
    const messages = user.messages;
    //send the messages
    res.status(200).json({
        messages: messages
    });

};

exports.readInbox = async (req,res, next) => { 
    //get all messages where the receiver is the public key of this user
    const receiver = req.body.receiver;
    console.log(receiver);
    //find the messages of the receiver
    let messages = await Message.find({receiver_key: receiver});
    //send the messages
    res.status(200).json({
        messages: messages
    });
}

