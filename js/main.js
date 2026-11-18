
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('selectionchange', () => {
        const selectedText = window.getSelection().toString();
    });

    const trailContainer = document.createElement('div');
    trailContainer.style.cssText =
        'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;width:100%;height:100%;overflow:hidden;';
    document.body.appendChild(trailContainer);

    window.addEventListener('mousemove', (e) => {
        const particle = document.createElement('span');
        particle.textContent = '†';
        particle.style.cssText = `
            position: absolute;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            color: #f6f6f6;
            font-size: 12px;
            pointer-events: none;
            user-select: none;
            transition: transform 2s ease-out, opacity 0.1s ease-out;
            transform: translate(-50%, -50%) scale(2);
            opacity: .3;
        `;

        trailContainer.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = `rotate(${Date.now()*30}) translate(-50%, ${Math.random() * 20 + 10}px) scale(1)`;
            particle.style.opacity = '0';
        });

        setTimeout(() => {
            particle.remove();
        }, 900);
    });
});


