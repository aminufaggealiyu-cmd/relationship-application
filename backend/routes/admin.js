const express = require("express");
const crypto = require("crypto");

const router = express.Router();


// ==================================================
// ADMIN LOGIN
// ==================================================

router.post("/login", (req, res) => {

    const {
        username,
        password
    } = req.body;


    if (
        username !==
        process.env.ADMIN_USERNAME
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid username or password."

        });

    }


    if (
        password !==
        process.env.ADMIN_PASSWORD
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid username or password."

        });

    }


    const token =
        process.env.ADMIN_TOKEN;


    res.json({

        success: true,

        token

    });

});


module.exports = router;