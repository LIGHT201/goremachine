document.addEventListener('DOMContentLoaded', function () {
    const symbol = document.getElementById('symbol');
    if (!symbol) return;

    let index = 1;

    function updateSymbol() {
        index = (index % 3) + 1;
        symbol.src = `/assets/special symbol${index}.png`;

        setTimeout(updateSymbol, 188);
    }

    updateSymbol();
});