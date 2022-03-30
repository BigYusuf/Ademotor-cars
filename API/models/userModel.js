
const express =require('express');
const mongoose =require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        isAdmin: { type: Boolean, default: false, required: true},
        isSeller: { type: Boolean, default: false, required: true},
        image: { type: String, required: true, default: "image"},
        profession:{type: String},
        RateUs:{type:Number, default: 0, required: true},
        ReviewUs:{type: String},
        seller: {
            name: String,
            logo: String,
            description: String,
            rating: { type: Number, default: 0, required: true},
            numReviews: { type: Number, default: 0, required: true}
        }
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;