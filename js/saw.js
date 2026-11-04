document.addEventListener('DOMContentLoaded', function() {
    const saw = document.getElementById('saw');

    let rot = 0;

    function updateSawPosition() {
        rot--;
saw.style.transform = `translate(-50%, -50%) rotate(${rot/23}deg)`;

        setTimeout(updateSawPosition, 16); // correct
    }

    updateSawPosition();
});
