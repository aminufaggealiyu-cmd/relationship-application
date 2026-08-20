// ============================================================
// RELATIONSHIP APPLICATION
// Frontend JavaScript
// ============================================================

// ------------------------------------------------------------
// API
// ------------------------------------------------------------

const API_URL =
    "https://relationship-application-api.onrender.com/api/applications";


// ------------------------------------------------------------
// SCREENS
// ------------------------------------------------------------

const welcomeScreen =
    document.getElementById("welcomeScreen");

const formScreen =
    document.getElementById("formScreen");

const analyzingScreen =
    document.getElementById("analyzingScreen");

const resultScreen =
    document.getElementById("resultScreen");

const finalScreen =
    document.getElementById("finalScreen");


// ------------------------------------------------------------
// BUTTONS
// ------------------------------------------------------------

const startBtn =
    document.getElementById("startBtn");

const finishBtn =
    document.getElementById("finishBtn");


// ------------------------------------------------------------
// FORM
// ------------------------------------------------------------

const form =
    document.getElementById("relationshipForm");


// ------------------------------------------------------------
// FORM STEPS
// ------------------------------------------------------------

const steps =
    document.querySelectorAll(".form-step");

const currentStepDisplay =
    document.getElementById("currentStep");

const progressBar =
    document.getElementById("progressBar");

let currentStep = 1;

const totalSteps =
    steps.length;


// ------------------------------------------------------------
// RESULT ELEMENTS
// ------------------------------------------------------------

const scoreDisplay =
    document.getElementById("score");

const analysisText =
    document.getElementById("analysisText");

const resultMessage =
    document.getElementById("resultMessage");


// ============================================================
// SCREEN CONTROL
// ============================================================

function showScreen(screen) {

    if (!screen) {
        console.error("Screen element not found.");
        return;
    }

    document
        .querySelectorAll(".screen")
        .forEach(section => {

            section.classList.remove("active");

        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ============================================================
// START APPLICATION
// ============================================================

if (startBtn) {

    startBtn.addEventListener("click", () => {

        currentStep = 1;

        updateStep();

        showScreen(formScreen);

    });

}


// ============================================================
// UPDATE FORM STEP
// ============================================================

function updateStep() {

    steps.forEach(step => {

        const stepNumber =
            Number(step.dataset.step);

        step.classList.toggle(
            "active",
            stepNumber === currentStep
        );

    });


    if (currentStepDisplay) {

        currentStepDisplay.textContent =
            currentStep;

    }


    if (progressBar) {

        const progress =
            (currentStep / totalSteps) * 100;

        progressBar.style.width =
            `${progress}%`;

    }

}


// ============================================================
// NEXT BUTTONS
// ============================================================

document
    .querySelectorAll(".next-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const currentFormStep =
                document.querySelector(
                    `.form-step[data-step="${currentStep}"]`
                );


            if (!currentFormStep) {
                return;
            }


            const inputs =
                currentFormStep.querySelectorAll(
                    "input, textarea, select"
                );


            for (const input of inputs) {

                if (
                    input.hasAttribute("required") &&
                    !input.checkValidity()
                ) {

                    input.reportValidity();

                    return;

                }

            }


            if (currentStep < totalSteps) {

                currentStep++;

                updateStep();

            }

        });

    });


// ============================================================
// BACK BUTTONS
// ============================================================

document
    .querySelectorAll(".prev-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            if (currentStep > 1) {

                currentStep--;

                updateStep();

            }

        });

    });


// ============================================================
// RESULT MESSAGE
// ============================================================

function generateResultMessage(score) {

    if (score >= 95) {

        return (
            "The system is extremely confident about this one."
        );

    }


    if (score >= 90) {

        return (
            "Very promising. Someone should probably take this seriously."
        );

    }


    if (score >= 85) {

        return (
            "Strong compatibility detected. This deserves further investigation."
        );

    }


    return (
        "There is definitely something here. Further research is recommended."
    );

}


// ============================================================
// AI ANALYSIS ANIMATION
// ============================================================

function runAnalysis() {

    const messages = [

        "Reviewing your application...",

        "Analyzing personality compatibility...",

        "Checking communication potential...",

        "Calculating relationship chemistry...",

        "Consulting the relationship algorithm...",

        "Comparing emotional compatibility...",

        "Running final calculations...",

        "Almost finished..."

    ];


    let index = 0;


    if (analysisText) {

        analysisText.textContent =
            messages[0];

    }


    const interval =
        setInterval(() => {

            index++;


            if (
                index < messages.length
            ) {

                if (analysisText) {

                    analysisText.textContent =
                        messages[index];

                }

            } else {

                clearInterval(interval);

            }

        }, 750);

}


// ============================================================
// FORM SUBMISSION
// ============================================================

if (form) {

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            // ------------------------------------------------
            // Collect form data
            // ------------------------------------------------

            const formData =
                new FormData(form);


            const application = {

                name:
                    formData.get("name"),

                nickname:
                    formData.get("nickname"),
                email: 
                    formData.get("email"),
                phone: 
                    formData.get("phone"),
                intention:
                    formData.get("intention"),

                jokes:
                    formData.get("jokes"),

                important:
                    formData.get("important"),

                message:
                    formData.get("message")

            };


            // ------------------------------------------------
            // Show analysis screen
            // ------------------------------------------------

            showScreen(
                analyzingScreen
            );

            runAnalysis();


            // ------------------------------------------------
            // Send application to Render
            // ------------------------------------------------

            try {

                console.log(
                    "Sending application to:",
                    API_URL
                );


                const response =
                    await fetch(
                        API_URL,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    application
                                )

                        }
                    );


                // --------------------------------------------
                // Convert response to JSON
                // --------------------------------------------

                const data =
                    await response.json();


                console.log(
                    "Backend response:",
                    data
                );


                // --------------------------------------------
                // Check for server errors
                // --------------------------------------------

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Submission failed."
                    );

                }


                // --------------------------------------------
                // Display compatibility score
                // --------------------------------------------

                if (scoreDisplay) {

                    scoreDisplay.textContent =
                        data.compatibilityScore;

                }


                // --------------------------------------------
                // Display result message
                // --------------------------------------------

                if (resultMessage) {

                    resultMessage.textContent =
                        generateResultMessage(
                            data.compatibilityScore
                        );

                }


                // --------------------------------------------
                // Wait for analysis animation
                // --------------------------------------------

                setTimeout(() => {

                    showScreen(
                        resultScreen
                    );

                }, 5000);


            } catch (error) {

                console.error(
                    "Application submission error:",
                    error
                );


                alert(
                    "Something went wrong while submitting your application. Please try again."
                );


                showScreen(
                    formScreen
                );

            }

        }
    );

}


// ============================================================
// FINISH BUTTON
// ============================================================

if (finishBtn) {

    finishBtn.addEventListener(
        "click",
        () => {

            showScreen(
                finalScreen
            );

        }
    );

}


// ============================================================
// INITIALIZE
// ============================================================

updateStep();


// ============================================================
// DEBUG MESSAGE
// ============================================================

console.log(
    "Relationship Application loaded successfully."
);

console.log(
    "API:",
    API_URL
);
