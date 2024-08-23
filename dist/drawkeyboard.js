"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('piano');
    const noteSelect = document.getElementById('note-select');
    const chordTypeSelect = document.getElementById('chord-type-select');
    if (!canvas || !noteSelect || !chordTypeSelect) {
        console.error("Canvas element not found.");
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("2D context is not supported in this browser.");
        return;
    }
    // Calculate available width and height for the canvas
    const margin = 0.1;
    const availableWidth = window.innerWidth * (1 - 2 * margin);
    const availableHeight = window.innerHeight * (1 - 2 * margin);
    // Set canvas dimensions to fill the available space with margins
    canvas.width = availableWidth;
    canvas.height = availableHeight;
    // Define keys array
    const keys = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    // Key dimensions
    const numberOfWhiteKeys = keys.filter(key => !key.includes('#')).length;
    const whiteKeyWidth = availableWidth / numberOfWhiteKeys;
    const whiteKeyHeight = availableHeight;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const blackKeyHeight = whiteKeyHeight * 0.6;
    const keyElements = {};
    function drawKeyboard() {
        let whiteKeyIndex = 0;
        // Draw white keys
        // Create a Type alias or interface to for type assertions
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
    }
    drawKeyboard();
    // Add click event listener
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        for (const [keyIndex, key] of Object.entries(keyElements)) {
            if (key.type === 'white' && x >= key.x && x <= key.x + key.width && y >= 0 && y <= whiteKeyHeight) {
                highlightKey(key.x, 0, key.width, whiteKeyHeight, rect.left, rect.top, true, 'white');
                break;
            }
            else if (key.type === 'black' && x >= key.x && x <= key.x + key.width && y >= 0 && y <= blackKeyHeight) {
                highlightKey(key.x, 0, key.width, blackKeyHeight, rect.left, rect.top, true, 'black');
                break;
            }
        }
    });
    // Highlight key effect
    function highlightKey(x, y, width, height, canvasLeft, canvasTop, isTemporary, keyType) {
        console.log(`Highlighting key at position (${x}, ${y}), size (${width}x${height}), temporary: ${isTemporary}, type: ${keyType}`);
        // Color and animation values
        const startColor = { r: 255, b: 0, g: 0, a: 1 }; // Red with full opacity
        const endColor = { r: 255, b: 0, g: 0, a: 0 }; // Red with zero opacity
        const duration = 200; // Duration of the effect in milliseconds
        const steps = 20; // Number of steps for the fading effect
        const interval = duration / steps;
        // Return if ctx is not null
        if (!ctx)
            return;
        // Add highlight to the key with animation effect
        let currentStep = 0;
        const animate = () => {
            const progress = currentStep / steps;
            // const color = `rgba(255, 0, 0, ${1 - progress})`;
            // Calculate the current color based on the progress
            const currentColor = {
                r: Math.round(startColor.r + progress * (endColor.r - startColor.r)),
                g: Math.round(startColor.g + progress * (endColor.g - startColor.g)),
                b: Math.round(startColor.b + progress * (endColor.b - startColor.b)),
                a: startColor.a + progress * (endColor.a - startColor.a)
            };
            const colorString = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`;
            // Redraw the keyboard to clear previous highlights
            drawKeyboard();
            // Add hightlight to the key
            ctx.fillStyle = colorString;
            ctx.fillRect(x, y, width, height);
            ctx.strokeRect(x, y, width, height);
            // Redraw black keys on top if necessary
            let whiteKeyIndex = 0;
            for (let i = 0; i < keys.length; i++) {
                if (!keys[i].includes('#')) {
                    whiteKeyIndex++;
                }
                else {
                    const blackKeyX = whiteKeyIndex * whiteKeyWidth - blackKeyWidth / 2;
                    ctx.fillStyle = 'black';
                    ctx.fillRect(blackKeyX, 0, blackKeyWidth, blackKeyHeight);
                }
            }
            currentStep++;
            if (currentStep <= steps) {
                requestAnimationFrame(animate);
            }
        };
        animate();
        // // Add highlight to the key
        // ctx.fillStyle = 'red';
        // ctx.fillRect(x, y, width, height);
        // ctx.strokeRect(x, y, width, height);
        // // Remove temporary hightlight
        // if (isTemporary) {
        //     setTimeout(() => {
        //         drawKeyboard();
        //     }, 200);
        // }
    }
    //     // Create a temporary element to add the animation effect
    //     const highlight = document.createElement('div');
    //     highlight.style.position = 'absolute';
    //     highlight.style.left = `${canvasLeft + x}px`;
    //     highlight.style.top = `${canvasTop + y}px`;
    //     highlight.style.width = `${width}px`;
    //     highlight.style.height = `${height}px`;
    //     highlight.style.border = '2px solid red';
    //     highlight.className = 'animate-highlight';
    //     // // Adjust z-index based on the key type
    //     // highlight.style.zIndex = '1';
    //     // if (height === blackKeyHeight) {
    //     //     highlight.style.zIndex = '2';
    //     // }
    //     // Adjust z-index based on the key type
    //     highlight.style.zIndex = keyType === 'black' ? '2' : '1';
    //     document.body.appendChild(highlight);
    //     // Remove the element after animation if it's temporary
    //     if (isTemporary) {
    //         setTimeout(() => {
    //             highlight.remove();
    //         }, 200);
    //     } else {
    //         // Ensure ctx is not null
    //         if (ctx) {
    //             ctx.fillStyle = 'red';
    //             ctx.fillRect(x, 0, width, height);
    //             ctx.strokeRect(x, 0, width, height);
    //         }
    //     }
    // }
    // Function to highlight keys based on selected note and chord type
    function highlightScale(note, chordType) {
        console.log(`Highlighting scale for note: ${note}, chord type: ${chordType}`);
        // Ensure ctx is not null
        if (!ctx) {
            console.error("2D context is not supported by this browser");
            return;
        }
        // Ensure canvas is not null
        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }
        // // Clear previous highlights
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawKeyboard();
        const noteIndices = {
            'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6,
            'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
        };
        const majorScalePattern = [0, 2, 4, 5, 7, 9, 11];
        const startIndex = noteIndices[note];
        console.log(`Start index for note ${note}: ${startIndex}`);
        majorScalePattern.forEach(interval => {
            // Calculate the key index for the note within the chromatic scale
            const keyIndex = (startIndex + interval) % 12;
            // Determine the octave and calculate the actual key index on the keyboard
            const octave = Math.floor((startIndex + interval) / 12);
            const actualKeyIndex = keyIndex + octave * 12;
            // Check if the key exists in the current layout
            const key = keyElements[actualKeyIndex];
            if (key) {
                const x = key.x;
                const width = key.width;
                const height = key.type === 'white' ? whiteKeyHeight : blackKeyHeight;
                console.log(`Highlighting key index: ${keyIndex}, x: ${x}, width: ${width}, height: ${height}`);
                // highlightKey(x, 0,width, height, canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().top, false, key.type)
                // Highlight key without redrawing the keyboard
                ctx.fillStyle = 'red';
                ctx.fillRect(x, 0, width, height);
                ctx.strokeRect(x, 0, width, height);
            }
        });
    }
    // Add event listeners to dropdowns
    if (noteSelect && chordTypeSelect) {
        noteSelect.addEventListener('change', () => {
            const note = noteSelect.value;
            const chordType = chordTypeSelect.value;
            highlightScale(note, chordType);
        });
        chordTypeSelect.addEventListener('change', () => {
            const note = noteSelect.value;
            const chordType = chordTypeSelect.value;
            highlightScale(note, chordType);
        });
    }
    // // Add event listeners to dropdowns
    // noteSelect.addEventListener('change', () => {
    //     const note = noteSelect.value;
    //     const chordType = chordTypeSelect.value;
    //     highlightScale(note, chordType);
    // });
    // chordTypeSelect.addEventListener('change', () => {
    //     const note = noteSelect.value;
    //     const chordType = chordTypeSelect.value;
    //     highlightScale(note, chordType);
    // });
});
