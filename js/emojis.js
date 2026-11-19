(() => {
    const scriptUrl = document.currentScript.src;
    const manifestUrl = new URL('../assets/emojis/manifest.json', scriptUrl);
    const emojiDirectoryUrl = new URL('./', manifestUrl);
    const excludedSelector = 'script, style, textarea, title, option, .emoji';
    const shortcodePattern = /:([a-z0-9_-]+):/gi;

    function replaceShortcodes(textNode, emojiFiles) {
        const text = textNode.nodeValue;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let replaced = false;
        let match;

        shortcodePattern.lastIndex = 0;

        while ((match = shortcodePattern.exec(text)) !== null) {
            const filename = emojiFiles.get(match[1].toLowerCase());

            if (!filename) {
                continue;
            }

            fragment.append(text.slice(lastIndex, match.index));

            const emoji = document.createElement('img');
            emoji.className = 'emoji';
            emoji.alt = match[1];
            emoji.title = match[1];
            emoji.src = new URL(encodeURIComponent(filename), emojiDirectoryUrl).href;
            fragment.append(emoji);

            lastIndex = shortcodePattern.lastIndex;
            replaced = true;
        }

        if (replaced) {
            fragment.append(text.slice(lastIndex));
            textNode.replaceWith(fragment);
        }
    }

    function parseNode(root, emojiFiles) {
        if (root.nodeType === Node.TEXT_NODE) {
            if (!root.parentElement.closest(excludedSelector)) {
                replaceShortcodes(root, emojiFiles);
            }
            return;
        }

        if (root.nodeType !== Node.ELEMENT_NODE || root.matches(excludedSelector)) {
            return;
        }

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walker.nextNode()) {
            if (!walker.currentNode.parentElement.closest(excludedSelector)) {
                textNodes.push(walker.currentNode);
            }
        }

        for (const textNode of textNodes) {
            replaceShortcodes(textNode, emojiFiles);
        }
    }

    async function initializeEmojiParser() {
        const response = await fetch(manifestUrl);

        if (!response.ok) {
            throw new Error(`Failed to load emoji manifest: ${response.status}`);
        }

        const filenames = await response.json();

        if (!Array.isArray(filenames)) {
            throw new Error('Emoji manifest must be an array of image filenames.');
        }

        const emojiFiles = new Map();

        for (const filename of filenames) {
            if (typeof filename !== 'string' || !/^[a-z0-9_-]+\.(png|gif|jpe?g|webp|svg)$/i.test(filename)) {
                throw new Error(`Invalid emoji filename in manifest: ${filename}`);
            }

            const shortcode = filename.slice(0, filename.lastIndexOf('.')).toLowerCase();
            emojiFiles.set(shortcode, filename);
        }

        const observer = new MutationObserver((records) => {
            for (const record of records) {
                for (const node of record.addedNodes) {
                    parseNode(node, emojiFiles);
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        parseNode(document.body, emojiFiles);
    }

    initializeEmojiParser().catch((error) => {
        console.error('Unable to initialize the emoji parser.', error);
    });
})();
