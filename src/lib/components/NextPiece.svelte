<script>
    import { onMount } from 'svelte';
    import { BLOCK_SIZE } from '../constants';
    
    export let piece;
    
    let canvas;
    let ctx;
    
    // Фиксированный размер 6x6 блоков для любой фигуры
    const PREVIEW_SIZE = 6;
    const canvasSize = PREVIEW_SIZE * BLOCK_SIZE;

    onMount(() => {
        ctx = canvas.getContext('2d');
        draw();
    });

    function draw() {
        if (!ctx || !piece) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        
        // Calculate centering offsets
        const pieceWidth = piece.shape[0].length;
        const pieceHeight = piece.shape.length;
        const offsetX = Math.floor((PREVIEW_SIZE - pieceWidth) / 2);
        const offsetY = Math.floor((PREVIEW_SIZE - pieceHeight) / 2);
        
        // Draw piece
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(
                        (offsetX + x) * BLOCK_SIZE,
                        (offsetY + y) * BLOCK_SIZE
                    );
                }
            });
        });
    }

    function drawBlock(x, y) {
        // Fill with the same gray color as in GameBoard
        ctx.fillStyle = '#666';
        ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    }

    $: if (piece && ctx) {
        draw();
    }
</script>

<div class="next-piece">
    <h3>Next Piece</h3>
    <canvas
        bind:this={canvas}
        width={canvasSize}
        height={canvasSize}
    />
</div>

<style>
    .next-piece {
        background-color: #2a2a2a;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 20px;
        width: fit-content;
    }

    h3 {
        color: white;
        margin: 0 0 10px 0;
    }

    canvas {
        background-color: #1a1a1a;
        border-radius: 5px;
        display: block;
    }
</style>
