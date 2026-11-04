document.addEventListener('DOMContentLoaded', function() {
    const symbol = document.getElementById('symbol');
    let index = 1;

    function updateSymbol() {
        // Cycle through 1-2-3 and go back :p
        index = (index % 3) + 1; 
        
        symbol.src = `assets/special symbol${index}.png`;

        
        setTimeout(updateSymbol, 188);
    }
    
    updateSymbol(); // Initial call
});