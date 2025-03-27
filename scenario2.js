document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    const slides = [
        'slide-objective-situation', //0
        'slide-decision1', //1
        'slide-decision2', //2
        'slide-ending-success', //3
        'slide-ending-failure1', //4
        'slide-ending-failure2', //5
        'slide-ending-failure3', //6
    ];
    let currentSlideIndex = 0;
    let points = 0;
    let initialPoints = 0;
    let pointsAdded = 0;
    let pointsDeducted = 0;
    let slidesVisible = 1;

    function updateProgressBar() {
        let progress = ((currentSlideIndex +1 ) / (slides.length-1)) * 100;
        progressBar.value = progress;
        if (currentSlideIndex == slides.length-1) progressBar.value = 100;
    }

    function showNextSlide(slideId) {
        const nextSlide = document.getElementById(slideId);
        if (nextSlide) {
            nextSlide.classList.remove('hidden');
            slidesVisible++;
            currentSlideIndex++;
            updateProgressBar();
        }
    }

    // Initial display
    document.getElementById(slides[0]).classList.remove('hidden');
    updateProgressBar();

    // Event listener for Objective/Situation
    const objectiveSlide = document.getElementById('slide-objective-situation');
    const continueObjectiveBtn = document.getElementById('continue-objective-situation');
    objectiveSlide.querySelector('h2').textContent = "Learning Objective]";
    objectiveSlide.querySelector('p').textContent = " Learn the correct procedures for evacuating an office building during a fire, especially when a primary exit is blocked.";
    continueObjectiveBtn.addEventListener('click', () => {
        continueObjectiveBtn.remove();
        showNextSlide(slides[1]);
    });

    // Event listener for Decision Point 1
    const decision1 = document.getElementById('slide-decision1');
    // decision1.querySelector('h2').textContent = "[Decision 1]";
    const decision1Choices = decision1.querySelector('.choices');

     // Dynamically create 3 choices for decision1
    decision1Choices.innerHTML = ''; // Clear existing content
    const choiceTexts1 = {
        'choiceA': "A) Immediately rush towards the main stairwell (your usual exit).",
        'choiceB': "B) Stay at your desk and wait for further instructions.",
        'choiceC': "C) Feel the door of your office for heat and then cautiously open it to assess the situation."
    };
    Object.entries(choiceTexts1).forEach(([key, text]) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.choice = key;
        decision1Choices.appendChild(button);
    });




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

            if (choice === 'choiceA') {
                feedback1Div.textContent = "Incorrect. While the main stairwell is your usual exit, the smoke indicates it's unsafe. Always assess the situation and look for alternative escape routes.";
                feedback1Div.className = 'feedback-message incorrect';
                consequence1Div.textContent = "You rush towards the main stairwell and find it filled with thick smoke, making it impassable. You see a Do Not Enter sign and hear coughing from below. Scenario progresses to Blocked Exit stage.";
                restartDecision1Btn.classList.remove('hidden');
                showNextSlide(slides[5]); 
                pointsDeducted += parseInt('[points deducted]');
            } else if (choice === 'choiceB') {
                feedback1Div.textContent = "Incorrect. When a fire alarm sounds, especially with an announcement of a fire, immediate evacuation is crucial. Do not wait for further instructions before taking action.";
                feedback1Div.className = 'feedback-message incorrect';
                consequence1Div.textContent = "You stay at your desk, thinking it might be a false alarm or that further instructions will be clearer.";
                restartDecision1Btn.classList.remove('hidden'); // Show failure ending
                showNextSlide(slides[4]); // Show failure ending
                pointsDeducted += parseInt('[points deducted]');
            } else if (choice === 'choiceC') {
                feedback1Div.textContent = "Correct! Assessing the situation before entering a potentially dangerous area is important. Now you need to find a safe exit.";
                feedback1Div.className = 'feedback-message correct';
                consequence1Div.textContent = "You carefully feel the door. It's warm but not hot. You cautiously open it a crack and see thick smoke in the hallway leading to the main stairwell. You also notice signs pointing towards an alternative fire escape on the other side of the floor. Scenario progresses to Alternative Exit stage.";
                continueDecision1Btn.classList.remove('hidden');
                showNextSlide(slides[2]); // Show Decision Point 2
                pointsAdded += parseInt('[points added]');
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
    // decision2.querySelector('h2').textContent = "[Decision 2]";
    const decision2Choices = decision2.querySelector('.choices');

    // Dynamically create 3 choices for decision2
    decision2Choices.innerHTML = ''; // Clear existing content
    const choiceTexts2 = {
        'choiceA': "A) Try to use the elevator to get to the ground floor quickly.",
        'choiceB': "B) Follow the signs towards the alternative fire escape.",
        'choiceC': "C) Go to a window and try to signal for help."
    };
    Object.entries(choiceTexts2).forEach(([key, text]) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.choice = key;
        decision2Choices.appendChild(button);
    });

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

            if (choice === 'choiceA') {
                feedback2Div.textContent = "Incorrect. Never use elevators during a fire. They can trap you if the power goes out or if the fire affects the elevator shaft";
                feedback2Div.className = 'feedback-message incorrect';
                consequence2Div.textContent = "You try to use the elevator, but it is unresponsive and displays an Out of Service message. The power may be cut due to the fire.";
                restartDecision2Btn.classList.remove('hidden');
                showNextSlide(slides[6]); // Show failure ending
                pointsDeducted += parseInt('[points deducted]');
            } else if (choice === 'choiceB') {
                feedback2Div.textContent = "Correct! Following designated fire escape routes is the safest way to evacuate a building during a fire. Proceed cautiously down the stairs.";
                feedback2Div.className = 'feedback-message correct';
                consequence2Div.textContent = "You follow the illuminated signs towards the alternative fire escape. You find a clear stairwell and safely evacuate the building.";
                continueDecision2Btn.classList.remove('hidden');
                showNextSlide(slides[3]); // Show success ending
                pointsAdded += parseInt('[points added]');
                
            } else if(choice ==='choiceC'){
                feedback2Div.textContent = "While signaling for help might be necessary in some situations, your priority should be to evacuate the building using available escape routes. You are on the third floor, and there's likely a safer way down.";
                feedback2Div.className = 'feedback-message incorrect';
                consequence2Div.textContent = " You go to a window and start shouting for help. While you might be seen, you are delaying your evacuation and putting yourself at risk. Scenario progresses to Waiting for Rescue stage (potentially leading to failure if rescue takes too long).";
                continueDecision2Btn.classList.remove('hidden');
                showNextSlide(slides[4]); // Show failure ending
                pointsAdded += parseInt('[points added]');
            }

        }
    });

    continueDecision2Btn.addEventListener('click', () => {
        decision2Choices.remove();
        continueDecision2Btn.remove();
        const pointsSummary = document.getElementById('points-summary');
        const finalPoints = initialPoints + pointsAdded - pointsDeducted + 20; // +20 for successful completion
        pointsSummary.textContent = "finalPoints";
         showNextSlide(slides[3]);
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