require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const applicationRoutes =
    require("./routes/applications");

const adminRoutes =
    require("./routes/admin");


const app = express();


// ==================================================
// MIDDLEWARE
// ==================================================

app.use(
    cors({
        origin: "*"
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "Relationship Application API is running."

    });

});


// ==================================================
// ROUTES
// ==================================================

app.use(
    "/api/applications",
    applicationRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);


// ==================================================
// 404
// ==================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message:
            "Route not found."

    });

});


// ==================================================
// START SERVER
// ==================================================

const PORT =
    process.env.PORT || 5000;


async function startServer() {

    try {

        await mongoose.connect(
            process.env.MONGODB_URI
        );


        console.log(
            "MongoDB connected successfully."
        );


        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on port ${PORT}`
                );

            }
        );


    } catch (error) {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);

    }

}


startServer();