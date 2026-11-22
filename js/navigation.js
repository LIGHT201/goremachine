document.addEventListener('DOMContentLoaded', function () {
    const navigation = document.querySelector('[data-site-navigation]');
    if (!navigation) return;

    fetch(new URL('base.html', document.baseURI))
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`Failed to load navigation: ${response.status}`);
            }
            return response.text();
        })
        .then(function (html) {
            navigation.innerHTML = html;
            const currentPage = new URL(window.location.href).pathname
                .replace(/\/+$/, '')
                .toLowerCase() || '/index.html';

            navigation.querySelectorAll('a[href]').forEach(function (link) {
                const linkPage = new URL(link.href, window.location.href).pathname
                    .replace(/\/+$/, '')
                    .toLowerCase();

                if (linkPage === currentPage) {
                    link.remove();
                }
            });
        })
        .catch(function (error) {
            console.error('Unable to load site navigation.', error);
        });
});
