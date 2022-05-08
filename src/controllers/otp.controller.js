const express = require("express");
const EventEmitter = require("events");
const sendOTP = require("../Middleware/MailUtil");
const User = require("../models/user.model")
const router = express.Router();
const eventEmitter = new EventEmitter();

router.post("",async(req,res)=>{
    try {
        const user = await User.findOne().sort({_id:-1}).limit(1).lean().exec()
        let otp = req.body.otp
        eventEmitter.on("send otp",sendOTP);
        eventEmitter.emit("send otp",user,otp)
        return res.status(200).send({user,otp})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})
module.exports=router;