document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.querySelector('[data-site-navigation]');
    if (!navigation) {
        return;
    }

    fetch(new URL('/base.html', document.baseURI))
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load navigation: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            navigation.innerHTML = html;
            let currentPage = new URL(window.location.href).pathname
                .replace(/\/+$/, '')
                .toLowerCase();
            if (!currentPage) {
                currentPage = '/index.html';
            }

            navigation.querySelectorAll('a[href]').forEach((link) => {
                const linkPage = new URL(link.href, window.location.href).pathname
                    .replace(/\/+$/, '')
                    .toLowerCase();

                if (linkPage === currentPage) {
                    link.remove();
                }
            });
        })
        .catch((error) => {
            console.error('Unable to load site navigation.', error);
        });
});
