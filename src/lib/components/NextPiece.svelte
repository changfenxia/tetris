<script>
    import { onMount } from 'svelte';
    import { BLOCK_SIZE } from '../constants';
    
    export let piece;
    
    let canvas;
    let ctx;
    let stathamFace;
    
    $: canvasWidth = piece ? piece.shape[0].length * BLOCK_SIZE : BLOCK_SIZE * 4;
    $: canvasHeight = piece ? piece.shape.length * BLOCK_SIZE : BLOCK_SIZE * 4;

    onMount(() => {
        ctx = canvas.getContext('2d');
        stathamFace = new Image();
        stathamFace.src = '/images/statham-face.jpg';
        draw();
    });

    function draw() {
        if (!ctx || !piece) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(x * BLOCK_SIZE, y * BLOCK_SIZE);
                }
            });
        });
    }

    function drawBlock(x, y) {
        const pattern = ctx.createPattern(stathamFace, 'repeat');
        ctx.fillStyle = pattern;
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
        width={canvasWidth}
        height={canvasHeight}
        class="next-piece-canvas"
    />
</div>

<style>
    .next-piece {
        border: 2px solid #333;
        padding: 10px;
        background-color: #f0f0f0;
        text-align: center;
    }

    h3 {
        margin: 0 0 10px 0;
    }

    .next-piece-canvas {
        background-color: #fff;
    }
</style>
