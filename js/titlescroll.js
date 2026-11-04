document.addEventListener('DOMContentLoaded', function() {
    let title = document.title;
    let index = 0;

    function updateTitle() {
        // Cycle through the title characters
        index = (index + 1) % title.length;
        document.title = title.substring(index) + title.substring(0, index);
        
        setTimeout(updateTitle, 238);
        
    }
    updateTitle(); // Initial call

});
