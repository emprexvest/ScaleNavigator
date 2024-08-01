document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('piano') as HTMLCanvasElement | null;
    const noteSelect = document.getElementById('note-select') as HTMLSelectElement | null;
    const chordTypeSelect = document.getElementById('chord-type-select') as HTMLSelectElement | null;
    
    if(!canvas || !noteSelect || !chordTypeSelect) {
        console.error("Canvas element not found.");
        return;
    }

    const ctx = canvas.getContext('2d');
    if(!ctx) {
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

    const keyElements: {[key: number]: { type: string, x: number, width: number } } = {};

    function drawKeyboard() {
        let whiteKeyIndex = 0;

            // Draw white keys
            // Create a Type alias or interface to for type assertions
        for (let i = 0; i < keys.length; i++) {
            const x = whiteKeyIndex * whiteKeyWidth;
            if (!keys[i].includes('#')) {
                (ctx as CanvasRenderingContext2D).fillStyle = 'white';
                (ctx as CanvasRenderingContext2D).fillRect(x, 0, whiteKeyWidth, whiteKeyHeight);
                (ctx as CanvasRenderingContext2D).strokeRect(x, 0, whiteKeyWidth, whiteKeyHeight);
                keyElements[i] = { type: 'white', x, width: whiteKeyWidth };
                whiteKeyIndex++;
            }
        }

        whiteKeyIndex = 0;

            // Draw black keys
        for (let i = 0; i < keys.length; i++) {
            if (!keys[i].includes('#')) {
                whiteKeyIndex++;
            } else {
                const x = whiteKeyIndex * whiteKeyWidth - blackKeyWidth / 2;
                (ctx as CanvasRenderingContext2D).fillStyle = 'black';
                (ctx as CanvasRenderingContext2D).fillRect(x, 0, blackKeyWidth, blackKeyHeight);
                keyElements[i] = { type: 'black', x, width: blackKeyWidth };
            }
        }
    }

    drawKeyboard();

    // let whiteKeyIndex = 0;
    // const keyElements: {[key: number]: { type: string, x: number, width: number } } = {};

    // // Draw white keys
    // for (let i = 0; i < keys.length; i++) {
    //     const x = whiteKeyIndex * whiteKeyWidth;
    //     if (!keys[i].includes('#')) {
    //         ctx.fillStyle = 'white';
    //         ctx.fillRect(x, 0, whiteKeyWidth, whiteKeyHeight);
    //         ctx.strokeRect(x, 0, whiteKeyWidth, whiteKeyHeight);
    //         keyElements[i] = { type: 'white', x, width: whiteKeyWidth };
    //         whiteKeyIndex++;
    //     }
    // }

    // // Reset value to 0
    // whiteKeyIndex = 0;

    // // Draw black keys
    // for (let i = 0; i < keys.length; i++) {
    //     if (!keys[i].includes('#')) {
    //         whiteKeyIndex++;
    //     } else {
    //         const x = whiteKeyIndex * whiteKeyWidth - blackKeyWidth / 2;
    //         ctx.fillStyle = 'black';
    //         ctx.fillRect(x, 0, blackKeyWidth, blackKeyHeight);
    //         keyElements[i] = { type: 'black', x, width: blackKeyWidth };
    //     }
    // }

    // Add click event listener
    canvas.addEventListener('click', (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (const [keyIndex, key] of Object.entries(keyElements)) {
            if (key.type === 'white' && x >= key.x && x <= key.x + key.width && y >= 0 && y <= whiteKeyHeight) {
                highlightKey(key.x, 0, key.width, whiteKeyHeight, rect.left, rect.top, true);
                break;
            } else if (key.type === 'black' && x >= key.x && x <= key.x + key.width && y >= 0 && y <= blackKeyHeight) {
                highlightKey(key.x, 0, key.width, blackKeyHeight, rect.left, rect.top, true);
                break;
            }
        }
    });

    function highlightKey(x: number, y: number, width: number, height: number, canvasLeft: number, canvasTop: number, isTemporary: boolean) {
        console.log(`Highlighting key at position (${x}, ${y}), size (${width}x${height}), temporary: ${isTemporary}`);
        
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

        // Remove the element after animation if it's temporary
        if (isTemporary) {
            setTimeout(() => {
                highlight.remove();
            }, 200);
        } else {
            // Ensure ctx is not null
            if (ctx) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x, 0, width, height);
                ctx.strokeRect(x, 0, width, height);
            }
        }
    }

    // Function to highlight keys based on selected note and chord type
    function highlightScale(note: string, chordType: string) {
        console.log(`Highlighting scale for note: ${note}, chord type: ${chordType}`);
        // Ensure ctx is not null
        if (!ctx) {
            console.error("2D context is not supported by this browser");
            return
        }
        
        // Ensure canvas is not null
        if (!canvas) {
            console.error("Canvas element not found");
            return
        }

        // Clear previous highlights
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawKeyboard();

        // // Redraw the keyboard
        // for (let i = 0; i < keys.length; i++) {
        //     const x = keyElements[i].x;
        //     if (keyElements[i].type === 'white') {
        //         ctx.fillStyle = 'white';
        //         ctx.fillRect(x, 0, keyElements[i].width, whiteKeyHeight);
        //         ctx.strokeRect(x, 0, keyElements[i].width, whiteKeyHeight);
        //     } else {
        //         ctx.fillStyle = 'black';
        //         ctx.fillRect(x, 0, keyElements[i].width, blackKeyHeight);
        //     }
        // }

        const noteIndices = {
            'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6,
            'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
        };

        const majorScalePattern = [0, 2, 4, 5, 7, 9, 11];
        const startIndex = noteIndices[note as keyof typeof noteIndices];
        console.log(`Start index for note ${note}: ${startIndex}`);



        majorScalePattern.forEach(interval => {
            const keyIndex = (startIndex + interval) % 12;
            const octave = Math.floor((startIndex + interval) / 12);
            const actualKeyIndex = keyIndex + octave * 12;

            const key = keyElements[actualKeyIndex];
            if (key) {
                const x = key.x;
                const width = key.width;
                const height = key.type === 'white' ? whiteKeyHeight : blackKeyHeight;

                console.log(`Highlighting key index: ${keyIndex}, x: ${x}, width: ${width}, height: ${height}`);
                highlightKey(x, 0,width, height, canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().top, false)
            }
        });

    }
    //     // Highlight the scale
    //     majorScalePattern.forEach(interval => {
    //         const keyIndex = (startIndex + interval) % 12;
    //         const x = keyElements[keyIndex].x;
    //         const width = keyElements[keyIndex].width;
    //         const height = keyElements[keyIndex].type === 'white' ? whiteKeyHeight : blackKeyHeight;

    //         console.log(`Highlighting key index: ${keyIndex}, x: ${x}, width: ${width}, height: ${height}`);

    //     // Highlight using the highlightKey function without the temporary effect
    //     highlightKey(x, 0,width, height, canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().top, false);

    //     });
    // }

    // Add event listeners to dropdowns
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
});
