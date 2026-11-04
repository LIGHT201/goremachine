document.addEventListener('DOMContentLoaded', function() {

    const cross = document.getElementById('cross');

    let crossPosition = -40;   // starting position in vh
    const targetPosition = 48; // final position in vh
    const easingFactor = 0.02;

    function updateCrossPosition() {
        const distance = targetPosition - crossPosition;

        if (Math.abs(distance) > 0.1) {
            crossPosition += distance * easingFactor;

            cross.style.setProperty('--top', `${crossPosition}vh`);
            cross.style.setProperty('transform', `translate(-50%, -50%) rotate(${crossPosition * 0.25}deg)`);

            setTimeout(updateCrossPosition, 16);
        }
    }

    updateCrossPosition();
});
