alert("Hey user, right now only 'Grease fire' and 'Obstructed Exit' scenarios are working. You will be alble to enter in other senarios very soon.");
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.scenario-navigation a');
    const scenarioSections = document.querySelectorAll('.scenario-list-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');

            scenarioSections.forEach(section => {
                section.style.display = 'none';
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // Initially show only the 'All Scenarios' section
    scenarioSections.forEach(section => {
        if (section.id !== 'all') {
            section.style.display = 'none';
        }
    });
});