const express = require("express");

const router = express.Router();

const Application = require("../models/Application");


// ==================================================
// ADMIN AUTHENTICATION MIDDLEWARE
// ==================================================

function authenticateAdmin(req, res, next) {

    const authorization =
        req.headers.authorization;


    if (!authorization) {

        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });

    }


    const token =
        authorization.replace("Bearer ", "");


    if (
        !token ||
        token !== process.env.ADMIN_TOKEN
    ) {

        return res.status(401).json({
            success: false,
            message: "Invalid authentication token."
        });

    }


    next();

}


// ==================================================
// SUBMIT APPLICATION
// ==================================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            nickname,
            intention,
            jokes,
            important,
            message
        } = req.body;


        if (
            !name ||
            !intention ||
            !jokes ||
            !important ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please complete all required fields."

            });

        }


        const compatibilityScore =
            Math.floor(Math.random() * 18) + 80;


        const application =
            new Application({

                name,
                nickname,
                intention,
                email,
                phone,
                jokes,
                important,
                message,
                compatibilityScore

            });


        await application.save();


        res.status(201).json({

            success: true,

            message:
                "Application received successfully.",

            compatibilityScore

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Server error."

        });

    }

});


// ==================================================
// GET APPLICATIONS
// PROTECTED
// ==================================================

router.get(
    "/",
    authenticateAdmin,
    async (req, res) => {

        try {

            const applications =
                await Application.find()
                    .sort({
                        createdAt: -1
                    });


            res.json({

                success: true,

                count:
                    applications.length,

                applications

            });


        } catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Could not retrieve applications."

            });

        }

    }
);


module.exports = router;
