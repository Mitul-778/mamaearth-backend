const mongoose = require("mongoose");

const babySchema = new mongoose.Schema({
    id : {type: Number, required:true},
    desc: {type: String, required: true},
    price: {type: String, required: true} ,
    img: {type: String, required: true},
    rating: {type: String, required: true},
    category: {type: String, required: true},
    rating_img: {type: String, required: true} 
},{
    timestamps: true,
    versionKey: false
})

const Baby = mongoose.model("baby", babySchema);
module.exports = Baby;

