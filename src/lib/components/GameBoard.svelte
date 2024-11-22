<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { BOARD_WIDTH, BOARD_HEIGHT, BLOCK_SIZE, STATHAM_FACE } from '../constants';
    
    export let board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
    export let currentPiece;
    export let currentPosition;
    
    const dispatch = createEventDispatcher();
    let canvas;
    let ctx;
    let stathamFace;
    let imageLoaded = false;

    onMount(() => {
        ctx = canvas.getContext('2d');
        stathamFace = new Image();
        stathamFace.src = STATHAM_FACE;
        stathamFace.onload = () => {
            console.log('Statham image loaded successfully');
            imageLoaded = true;
            draw();
        };
        stathamFace.onerror = (e) => {
            console.error('Failed to load Statham image:', e);
            console.error('Attempted image path:', STATHAM_FACE);
            imageLoaded = false;
            draw();
        };
        draw();
    });

    function draw() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the board
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (board[y][x]) {
                    drawBlock(x * BLOCK_SIZE, y * BLOCK_SIZE);
                }
            }
        }
        
        // Draw current piece
        if (currentPiece && currentPosition) {
            currentPiece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        const posX = (currentPosition.x + x) * BLOCK_SIZE;
                        const posY = (currentPosition.y + y) * BLOCK_SIZE;
                        drawBlock(posX, posY);
                    }
                });
            });
        }
    }

    function drawBlock(x, y) {
        // Draw colored background first
        ctx.fillStyle = '#666666';
        ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);

        // Draw Statham face if image is loaded
        if (imageLoaded) {
            try {
                // Create a temporary canvas for scaling
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = BLOCK_SIZE;
                tempCanvas.height = BLOCK_SIZE;
                const tempCtx = tempCanvas.getContext('2d');
                
                // Draw and scale the image
                tempCtx.drawImage(stathamFace, 0, 0, BLOCK_SIZE, BLOCK_SIZE);
                
                // Use the scaled image
                ctx.drawImage(tempCanvas, x, y);
            } catch (error) {
                console.error('Error drawing scaled image:', error);
            }
        }

        // Draw border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    }

    $: if (board || currentPiece || currentPosition) {
        if (ctx) draw();
    }
</script>

<div class="game-board-container">
    <canvas
        bind:this={canvas}
        width={BOARD_WIDTH * BLOCK_SIZE}
        height={BOARD_HEIGHT * BLOCK_SIZE}
        class="game-board"
    />
</div>

<style>
    .game-board-container {
        padding: 10px;
        background-color: #2a2a2a;
        border-radius: 5px;
    }

    .game-board {
        border: 2px solid #333;
        background-color: #1a1a1a;
    }
</style>
