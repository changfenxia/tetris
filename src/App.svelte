<script>
    import { onMount, onDestroy } from 'svelte';
    import GameBoard from './lib/components/GameBoard.svelte';
    import NextPiece from './lib/components/NextPiece.svelte';
    import ScoreBoard from './lib/components/ScoreBoard.svelte';
    import StathamEffect from './lib/components/StathamEffect.svelte';
    import {
        createBoard,
        getRandomTetromino,
        isValidMove,
        addPieceToBoard,
        clearLines,
        calculateScore,
        calculateLevel,
        calculateDropTime,
        rotatePiece
    } from './lib/game';

    let board = createBoard();
    let currentPiece = getRandomTetromino();
    let nextPiece = getRandomTetromino();
    let currentPosition = { x: 4, y: 0 };
    let score = 0;
    let lines = 0;
    let level = 0;
    let gameOver = false;
    let paused = false;
    let showStathamEffect = false;
    let dropInterval;

    function startGame() {
        if (gameOver) {
            board = createBoard();
            currentPiece = getRandomTetromino();
            nextPiece = getRandomTetromino();
            currentPosition = { x: 4, y: 0 };
            score = 0;
            lines = 0;
            level = 0;
            gameOver = false;
        }
        paused = false;
        setupDropInterval();
    }

    function setupDropInterval() {
        clearInterval(dropInterval);
        dropInterval = setInterval(drop, calculateDropTime(level));
    }

    function drop() {
        if (paused || gameOver) return;

        const newPosition = { ...currentPosition, y: currentPosition.y + 1 };
        
        if (isValidMove(board, currentPiece, newPosition)) {
            currentPosition = newPosition;
        } else {
            // Lock the piece
            board = addPieceToBoard(board, currentPiece, currentPosition);
            
            // Check for cleared lines
            const { newBoard, linesCleared } = clearLines(board);
            
            if (linesCleared > 0) {
                showStathamEffect = true;
                setTimeout(() => showStathamEffect = false, 3000);
                
                board = newBoard;
                lines += linesCleared;
                score += calculateScore(linesCleared, level);
                level = calculateLevel(lines);
                setupDropInterval();
            }
            
            // Get next piece
            currentPiece = nextPiece;
            nextPiece = getRandomTetromino();
            currentPosition = { x: 4, y: 0 };
            
            // Check for game over
            if (!isValidMove(board, currentPiece, currentPosition)) {
                gameOver = true;
                clearInterval(dropInterval);
            }
        }
    }

    function handleKeydown(event) {
        if (gameOver || paused) return;

        switch (event.key) {
            case 'ArrowLeft': {
                const newPosition = { ...currentPosition, x: currentPosition.x - 1 };
                if (isValidMove(board, currentPiece, newPosition)) {
                    currentPosition = newPosition;
                }
                break;
            }
            case 'ArrowRight': {
                const newPosition = { ...currentPosition, x: currentPosition.x + 1 };
                if (isValidMove(board, currentPiece, newPosition)) {
                    currentPosition = newPosition;
                }
                break;
            }
            case 'ArrowDown': {
                drop();
                break;
            }
            case 'ArrowUp': {
                const rotated = rotatePiece(currentPiece);
                if (isValidMove(board, rotated, currentPosition)) {
                    currentPiece = rotated;
                }
                break;
            }
            case ' ': {
                while (isValidMove(board, currentPiece, { ...currentPosition, y: currentPosition.y + 1 })) {
                    currentPosition = { ...currentPosition, y: currentPosition.y + 1 };
                }
                drop();
                break;
            }
            case 'p': {
                paused = !paused;
                break;
            }
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        clearInterval(dropInterval);
        window.removeEventListener('keydown', handleKeydown);
    });
</script>

<main>
    <div class="game-container">
        <StathamEffect show={showStathamEffect} />
        <div class="game-info">
            <NextPiece piece={nextPiece} />
            <ScoreBoard score={score} level={level} lines={lines} />
            <div class="controls">
                <button on:click={startGame}>
                    {gameOver ? 'New Game' : paused ? 'Resume' : 'Start'}
                </button>
                {#if !gameOver && !paused}
                    <button on:click={() => paused = true}>Pause</button>
                {/if}
            </div>
        </div>
        <GameBoard board={board} currentPiece={currentPiece} currentPosition={currentPosition} />
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #1a1a1a;
        padding: 20px;
    }

    .game-container {
        display: flex;
        gap: 20px;
        background-color: #2a2a2a;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        align-items: flex-start;
    }

    .game-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    button {
        padding: 10px 20px;
        font-size: 1.2em;
        border: none;
        border-radius: 5px;
        background-color: #4a4a4a;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #5a5a5a;
    }
</style>
