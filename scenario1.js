document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    const slides = [
        'slide-objective-situation',
        'slide-decision1',
        'slide-decision2',
        'slide-ending-success',
        'slide-ending-failure'
    ];
    let currentSlideIndex = 0;
    let points = 0;
    const initialPoints = 100; // Example initial points
    let pointsAdded = 0;
    let pointsDeducted = 0;
    let slidesVisible = 1; // Keep track of the number of visible slides

    function updateProgressBar() {
        const progress = (slidesVisible / slides.length) * 100;
        progressBar.value = progress;
    }

    function showNextSlide(slideId) {
        const nextSlide = document.getElementById(slideId);
        if (nextSlide) {
            nextSlide.classList.remove('hidden');
            slidesVisible++;
            updateProgressBar();
        }
    }

    // Initial display
    document.getElementById(slides[0]).classList.remove('hidden');
    updateProgressBar();

    // Event listener for Objective/Situation
    const objectiveSlide = document.getElementById('slide-objective-situation');
    const continueObjectiveBtn = document.getElementById('continue-objective-situation');
    continueObjectiveBtn.addEventListener('click', () => {
        continueObjectiveBtn.remove();
        showNextSlide(slides[1]);
    });

    // Event listener for Decision Point 1
    const decision1 = document.getElementById('slide-decision1');
    const decision1Choices = decision1.querySelector('.choices');
    const feedback1Div = document.getElementById('feedback1');
    const consequence1Div = document.getElementById('consequence1');
    const continueDecision1Btn = document.getElementById('continue-decision1');
    const restartDecision1Btn = document.getElementById('restart-decision1');
    let decision1Made = false;

    decision1Choices.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && !decision1Made) {
            decision1Made = true;
            const choice = event.target.dataset.choice;
            decision1Choices.querySelectorAll('button').forEach(btn => btn.disabled = true);

            if (choice === 'A') {
                feedback1Div.textContent = "Incorrect. Water will make a grease fire worse! Grease and water don't mix and can spread the fire. Grease fires are Class B fires.";
                feedback1Div.className = 'feedback-message incorrect';
                consequence1Div.textContent = "Fire flares up, worsens.";
                restartDecision1Btn.classList.remove('hidden');
                showNextSlide(slides[4]); // Show failure ending
                pointsDeducted += 4;
            } else if (choice === 'B') {
                feedback1Div.textContent = "Correct! A fire extinguisher is the right tool. Now, which type of extinguisher?";
                feedback1Div.className = 'feedback-message correct';
                consequence1Div.textContent = "Proceeding to extinguisher choice.";
                continueDecision1Btn.classList.remove('hidden');
                showNextSlide(slides[2]); // Show Decision Point 2
                pointsAdded += 10;
            }
        }
    });

    continueDecision1Btn.addEventListener('click', () => {
        decision1Choices.remove();
        continueDecision1Btn.remove();
    });

    restartDecision1Btn.addEventListener('click', () => {
        location.reload();
    });

    // Event listener for Decision Point 2
    const decision2 = document.getElementById('slide-decision2');
    const decision2Choices = decision2.querySelector('.choices');
    const feedback2Div = document.getElementById('feedback2');
    const consequence2Div = document.getElementById('consequence2');
    const continueDecision2Btn = document.getElementById('continue-decision2');
    const restartDecision2Btn = document.getElementById('restart-decision2');
    let decision2Made = false;

    decision2Choices.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && !decision2Made) {
            decision2Made = true;
            const choice = event.target.dataset.choice;
            decision2Choices.querySelectorAll('button').forEach(btn => btn.disabled = true);

            if (choice === 'A') {
                feedback2Div.textContent = "Incorrect. Water extinguishers are not effective on grease fires (Class B). They are for Class A fires (paper, wood, etc.).";
                feedback2Div.className = 'feedback-message incorrect';
                consequence2Div.textContent = "Fire likely to reignite.";
                restartDecision2Btn.classList.remove('hidden');
                showNextSlide(slides[4]); // Show failure ending
                pointsDeducted += 4;
            } else if (choice === 'B') {
                feedback2Div.textContent = "Correct! A Class B (or ABC) extinguisher is designed for grease and flammable liquid fires. Aim at the base of the flames and use a sweeping motion.";
                feedback2Div.className = 'feedback-message correct';
                consequence2Div.textContent = "Fire suppressed.";
                continueDecision2Btn.classList.remove('hidden');
                showNextSlide(slides[3]); // Show success ending
                pointsAdded += 10;
            }
        }
    });

    continueDecision2Btn.addEventListener('click', () => {
        decision2Choices.remove();
        continueDecision2Btn.remove();
        const pointsSummary = document.getElementById('points-summary');
        const finalPoints = initialPoints + pointsAdded - pointsDeducted + 20; // +20 for successful completion
        pointsSummary.textContent = `${pointsAdded} points added and ${pointsDeducted} points deducted, now your total points are ${finalPoints} points.`;
    });

    restartDecision2Btn.addEventListener('click', () => {
        location.reload();
    });

    const restartEndingFailureBtn = document.getElementById('restart-ending-failure');
    if (restartEndingFailureBtn) {
        restartEndingFailureBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    // Initially show only the first slide
    slides.slice(1).forEach(id => document.getElementById(id).classList.add('hidden'));
});