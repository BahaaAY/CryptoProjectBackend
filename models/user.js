const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    public_key: {
        type: String,
        required: true
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

module.exports = mongoose.model("User", userSchema);