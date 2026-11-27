document.addEventListener('DOMContentLoaded', function () {
    const title = document.title;
    let index = 0;

    function updateTitle() {
        index = (index + 1) % title.length;
        document.title = title.substring(index) + title.substring(0, index);

        setTimeout(updateTitle, 238);
    }

    updateTitle();
});
