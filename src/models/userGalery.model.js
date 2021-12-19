const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    pictures: [{type: "string", required: true}]
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("product", userSchema);