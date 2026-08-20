const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        nickname: {
            type: String,
            trim: true,
            default: ""
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: ""
        },

        phone: {
            type: String,
            trim: true,
            default: ""
        },

        intention: {
            type: String,
            required: true
        },

        jokes: {
            type: String,
            required: true
        },

        important: {
            type: String,
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true
        },

        compatibilityScore: {
            type: Number,
            required: true,
            min: 80,
            max: 97
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);
