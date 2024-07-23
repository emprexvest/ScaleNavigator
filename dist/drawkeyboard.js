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
    const whiteKeyWidth = 350 / 14;
    const whiteKeyHeight = 100;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const blackKeyHeight = whiteKeyHeight * 0.6;
    const keys = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    let whiteKeyIndex = 0;
    // Draw white keys
    for (let i = 0; i < keys.length; i++) {
        if (!keys[i].includes('#')) {
            ctx.fillStyle = 'white';
            ctx.fillRect(whiteKeyIndex * whiteKeyWidth, 0, whiteKeyWidth, whiteKeyHeight);
            ctx.strokeRect(whiteKeyIndex * whiteKeyWidth, 0, whiteKeyWidth, whiteKeyHeight);
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
            ctx.fillStyle = 'black';
            ctx.fillRect(whiteKeyIndex * whiteKeyWidth - blackKeyHeight / 2, 0, blackKeyWidth, blackKeyHeight);
        }
    }
});
