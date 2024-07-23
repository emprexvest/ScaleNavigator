"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('piano');
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("2D context is not supported in this browser.");
        return;
    }
    // Key dimensions
    const whiteKeyWidth = 350 / 14;
    const whiteKeyHeight = 100;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const blackKeyHeight = whiteKeyHeight * 0.6;
    const keys = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    let whiteKeyIndex = 0;
    const keyElements = {};
    // Draw white keys
    for (let i = 0; i < keys.length; i++) {
        const x = whiteKeyIndex * whiteKeyWidth;
        if (!keys[i].includes('#')) {
            ctx.fillStyle = 'white';
            ctx.fillRect(x, 0, whiteKeyWidth, whiteKeyHeight);
            ctx.strokeRect(x, 0, whiteKeyWidth, whiteKeyHeight);
            keyElements[i] = { type: 'white', x, width: whiteKeyWidth };
            whiteKeyIndex++;
        }
    }
    whiteKeyIndex = 0;
    // Draw black keys
    for (let i = 0; i < keys.length; i++) {
        if (!keys[i].includes('#')) {
            whiteKeyIndex++;
        }
        else {
            const x = whiteKeyIndex * whiteKeyWidth - blackKeyWidth / 2;
            ctx.fillStyle = 'black';
            ctx.fillRect(x, 0, blackKeyWidth, blackKeyHeight);
            keyElements[i] = { type: 'black', x, width: blackKeyWidth };
        }
    }
    // Add click event listener
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        for (const [keyIndex, key] of Object.entries(keyElements)) {
            if (key.type === 'white' && x >= key.x && x <= key.x + key.width && y >= 0 && y <= whiteKeyHeight) {
                highlightKey(key.x, 0, key.width, whiteKeyHeight, rect.left, rect.top);
                break;
            }
            else if (key.type === 'black' && x >= key.x && x <= key.x + key.width && y >= 0 && y <= blackKeyHeight) {
                highlightKey(key.x, 0, key.width, blackKeyHeight, rect.left, rect.top);
                break;
            }
        }
    });
    function highlightKey(x, y, width, height, canvasLeft, canvasTop) {
        // Create a temporary element to add the animation effect
        const highlight = document.createElement('div');
        highlight.style.position = 'absolute';
        highlight.style.left = `${canvasLeft + x}px`;
        highlight.style.top = `${canvasTop + y}px`;
        highlight.style.width = `${width}px`;
        highlight.style.height = `${height}px`;
        highlight.style.border = '2px solid red';
        highlight.className = 'animate-highlight';
        document.body.appendChild(highlight);
        // Remove the element after animation
        setTimeout(() => {
            highlight.remove();
        }, 200);
    }
});
