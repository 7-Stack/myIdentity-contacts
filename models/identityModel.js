const mongoose = require("mongoose");

const identitySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add the identity name"],
    },
    email: {
        type: String,
        require: [true, "please add the identity email address"],
    },
    phone: {
        type: String,
        require: [true, "please add the identity phone number"],
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Identity", identitySchema);