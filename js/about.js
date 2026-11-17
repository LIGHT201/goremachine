function renderAboutHtml(container, html) {
    container.innerHTML = html;

    for (const inertScript of container.querySelectorAll('script')) {
        const script = document.createElement('script');
        for (const attribute of inertScript.attributes) {
            script.setAttribute(attribute.name, attribute.value);
        }
        script.textContent = inertScript.textContent;
        inertScript.replaceWith(script);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const aboutContent = document.getElementById('about-content');

    if (!aboutContent) {
        return;
    }

    try {
        const response = await fetch('chp/about.txt');
        if (!response.ok) {
            throw new Error(`Failed to load about.txt: ${response.status}`);
        }

        renderAboutHtml(aboutContent, await response.text());
    } catch (error) {
        console.error('Unable to load the about text.', error);
        aboutContent.textContent = 'Unable to load about information.';
    }
});
