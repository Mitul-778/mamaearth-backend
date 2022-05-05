const express = require("express");

const router = express.Router();
const Baby = require("../models/baby.model");

router.get('', async(req,res)=>{
    try {
        const babys= await Baby.find({}).lean().exec();
        return res.status(200).send(babys);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.post('', async(req,res)=>{
    try {
        const baby= await Baby.create(req.body);
        return res.status(201).send(baby);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const baby= await Baby.findById(req.params.id);
        return res.status(201).send(baby);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

module.exports = router;