const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender_key: {
        type: String,
        required: true

    },
    receiver_key: {
        type: String,
        required: true
    },
    AesKey:{
        type: String,
        required: true
    }
     
});

module.exports = mongoose.model("Message", messageSchema);