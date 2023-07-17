const asyncHandler = require("express-async-handler");
const Identity = require("../models/identityModel");
//@desc Get all John's identity
//@route GET /api/contacts
//@access public
const getAllIdentity = asyncHandler(async (req, res) => {
    const allIdentity = await Identity.find();
    res.status(200).json(allIdentity);
    
});

//@desc Create John's identity
//@route POST /api/contacts
//@access public
const createIdentity = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status (400);
        throw new Error ("  All fields are mandatory! ");
    }
    const identity = await Identity.create({
        name,
        email,
        phone,
    });
    res.status(201).json(identity);
    
});

//@desc Get John's identity
//@route GET /api/contacts/:id
//@access public
const getIdentity = asyncHandler(async (req, res) => {
    const Identity = await Identity.findById(req.params.id);
    if (!Identity) {
        res.status(404);
        throw new Error ("Identity not found");
    }
     res.status(200).json(Identity);
        
});

//@desc Update John's identity
//@route PUT /api/contacts/:id
//@access public
const updateIdentity = asyncHandler(async (req, res) => {
    const Identity = await Identity.findById(req.params.id);
    if (!Identity) {
        res.status(404);
        throw new Error ("Identity not found");
    }

    const updatedIdentity = await Identity.findByIdAndUpdate (
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedIdentity);
    
});

//@desc Delete John's identity
//@route DELETE /api/contacts/:id
//@access public
const deleteIdentity = asyncHandler(async (req, res) => {
    const Identity = await Identity.findById(req.params.id);
    if (!Identity) {
        res.status(404);
        throw new Error ("Identity not found");
    }
    await Identity.remove();
    res.status(201).json(Identity);
    
});

module.exports = {
 getAllIdentity, 
 createIdentity, 
 getIdentity,
 updateIdentity,
 deleteIdentity 
};