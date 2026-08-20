const welcomeScreen = document.getElementById("welcomeScreen");
const formScreen = document.getElementById("formScreen");
const analyzingScreen = document.getElementById("analyzingScreen");
const resultScreen = document.getElementById("resultScreen");
const finalScreen = document.getElementById("finalScreen");

const startBtn = document.getElementById("startBtn");
const finishBtn = document.getElementById("finishBtn");

const form = document.getElementById("relationshipForm");

const steps = document.querySelectorAll(".form-step");

const currentStepDisplay = document.getElementById("currentStep");
const progressBar = document.getElementById("progressBar");

const scoreDisplay = document.getElementById("score");
const analysisText = document.getElementById("analysisText");
const resultMessage = document.getElementById("resultMessage");

let currentStep = 1;
const totalSteps = steps.length;


// --------------------------------------------------
// SCREEN CONTROL
// --------------------------------------------------

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(section => {
        section.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// --------------------------------------------------
// START APPLICATION
// --------------------------------------------------

startBtn.addEventListener("click", () => {

    currentStep = 1;

    updateStep();

    showScreen(formScreen);

});


// --------------------------------------------------
// UPDATE FORM STEP
// --------------------------------------------------

function updateStep() {

    steps.forEach(step => {

        const stepNumber = Number(step.dataset.step);

        step.classList.toggle(
            "active",
            stepNumber === currentStep
        );

    });

    currentStepDisplay.textContent = currentStep;

    const progress = (currentStep / totalSteps) * 100;

    progressBar.style.width = `${progress}%`;

}


// --------------------------------------------------
// NEXT BUTTONS
// --------------------------------------------------

document.querySelectorAll(".next-btn").forEach(button => {

    button.addEventListener("click", () => {

        const currentFormStep =
            document.querySelector(
                `.form-step[data-step="${currentStep}"]`
            );

        const inputs =
            currentFormStep.querySelectorAll(
                "input, textarea"
            );

        let valid = true;

        for (const input of inputs) {

            if (
                input.hasAttribute("required") &&
                !input.checkValidity()
            ) {

                input.reportValidity();

                valid = false;

                break;
            }
        }

        if (!valid) {
            return;
        }

        if (currentStep < totalSteps) {

            currentStep++;

            updateStep();

        }

    });

});


// --------------------------------------------------
// BACK BUTTONS
// --------------------------------------------------

document.querySelectorAll(".prev-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (currentStep > 1) {

            currentStep--;

            updateStep();

        }

    });

});


// --------------------------------------------------
// RANDOM COMPATIBILITY SCORE
// 80 - 97
// --------------------------------------------------

function generateCompatibilityScore() {

    return Math.floor(
        Math.random() * 18
    ) + 80;

}


// --------------------------------------------------
// RANDOM RESULT MESSAGE
// --------------------------------------------------

function generateResultMessage(score) {

    if (score >= 95) {

        return "The system is extremely confident about this one.";

    }

    if (score >= 90) {

        return "Very promising. Someone should probably take this seriously.";

    }

    if (score >= 85) {

        return "Strong compatibility detected. This deserves further investigation.";

    }

    return "There is definitely something here. Further research is recommended.";

}


// --------------------------------------------------
// AI ANALYSIS ANIMATION
// --------------------------------------------------

function runAnalysis() {

    const messages = [

        "Reviewing your application...",

        "Analyzing personality compatibility...",

        "Checking communication potential...",

        "Calculating relationship chemistry...",

        "Consulting the relationship algorithm...",

        "Almost finished..."

    ];

    let index = 0;

    analysisText.textContent = messages[0];

    const interval = setInterval(() => {

        index++;

        if (index < messages.length) {

            analysisText.textContent = messages[index];

        } else {

            clearInterval(interval);

        }

    }, 750);

}


// --------------------------------------------------
// FORM SUBMISSION
// --------------------------------------------------

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData(form);

    const application = {

        name: formData.get("name"),

        nickname: formData.get("nickname"),

        intention: formData.get("intention"),

        jokes: formData.get("jokes"),

        important: formData.get("important"),

        message: formData.get("message")

    };


    showScreen(analyzingScreen);

    runAnalysis();


    try {

        /*
         * LOCAL TESTING:
         */

       const API_URL="https://relationship-application-api.onrender.com"/api/applications";


        /*
         * LATER, WHEN WE DEPLOY TO RENDER,
         * WE WILL CHANGE THIS TO:
         *
         * https://your-app-name.onrender.com/api/applications
         */


        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(application)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Submission failed."
            );

        }


        // Use the score generated by the backend.

        scoreDisplay.textContent =
            data.compatibilityScore;


        resultMessage.textContent =
            generateResultMessage(
                data.compatibilityScore
            );


        setTimeout(() => {

            showScreen(resultScreen);

        }, 5000);


    } catch (error) {

        console.error(error);


        alert(
            "Something went wrong while submitting your application. Please try again."
        );


        showScreen(formScreen);

    }

});


    // ----------------------------------------------
    // SHOW ANALYSIS SCREEN
    // ----------------------------------------------

    showScreen(analyzingScreen);

    runAnalysis();


    // ----------------------------------------------
    // GENERATE RANDOM SCORE
    // ----------------------------------------------

    const score = generateCompatibilityScore();

    scoreDisplay.textContent = score;

    resultMessage.textContent =
        generateResultMessage(score);


    // ----------------------------------------------
    // SEND TO BACKEND
    // ----------------------------------------------
    // The backend URL will be added later.
    //
    // Example:
    //
    // await fetch("https://YOUR-RENDER-URL.onrender.com/api/applications", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(application)
    // });


    console.log(
        "Application:",
        application
    );


    // ----------------------------------------------
    // WAIT BEFORE SHOWING RESULT
    // ----------------------------------------------

    setTimeout(() => {

        showScreen(resultScreen);

    }, 5000);

});


// --------------------------------------------------
// FINISH
// --------------------------------------------------

finishBtn.addEventListener("click", () => {

    showScreen(finalScreen);

});
