const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    pictures: [{type: String, required: true}]
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("galery", userSchema);