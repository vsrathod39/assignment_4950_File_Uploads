const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    name: {type: "String", required: true, unique: true},
    price: {type: "String", required: true},
    image_url: [{type: "String", required: true, unique: true}],
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("product", productSchema);