<script>
    import { onMount, onDestroy } from 'svelte';
    import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOS } from './lib/constants';
    import { isValidMove, moveDown, mergePiece, clearLines, calculateScore } from './lib/game';
    import GameBoard from './lib/components/GameBoard.svelte';
    import NextPiece from './lib/components/NextPiece.svelte';
    import ScoreBoard from './lib/components/ScoreBoard.svelte';
    import StathamEffect from './lib/components/StathamEffect.svelte';

    let board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
    let currentPiece = null;
    let nextPiece = null;
    let currentPosition = { x: 0, y: 0 };
    let score = 0;
    let level = 0;
    let lines = 0;
    let gameLoop;
    let gameOver = false;
    let paused = false;
    let showStathamEffect = false;

    function getRandomPiece() {
        const pieces = Object.keys(TETROMINOS);
        const piece = TETROMINOS[pieces[Math.floor(Math.random() * pieces.length)]];
        return { ...piece };
    }

    function startGame() {
        console.log('Starting game...');
        if (gameLoop) clearInterval(gameLoop);
        
        board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
        currentPiece = getRandomPiece();
        nextPiece = getRandomPiece();
        currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
        score = 0;
        level = 0;
        lines = 0;
        gameOver = false;
        paused = false;
        showStathamEffect = false;
        
        gameLoop = setInterval(update, 1000 - (level * 50));
        console.log('Game loop started');
    }

    function update() {
        if (paused || gameOver) return;
        
        console.log('Game update tick');
        const newPosition = moveDown(board, currentPiece, currentPosition);
        
        if (newPosition) {
            currentPosition = newPosition;
        } else {
            console.log('Piece landed');
            // Merge current piece
            board = mergePiece(board, currentPiece, currentPosition);
            
            // Check for completed lines
            const { board: newBoard, linesCleared } = clearLines(board);
            board = newBoard;
            
            if (linesCleared > 0) {
                lines += linesCleared;
                score += calculateScore(linesCleared, level);
                level = Math.floor(lines / 10);
                
                // Сначала сбрасываем эффект, чтобы он мог появиться снова
                showStathamEffect = false;
                // Используем setTimeout, чтобы дать время на обновление состояния
                setTimeout(() => {
                    showStathamEffect = true;
                }, 50);
                
                // Update game speed
                clearInterval(gameLoop);
                gameLoop = setInterval(update, 1000 - (level * 50));
            }
            
            // Get next piece
            currentPiece = nextPiece;
            nextPiece = getRandomPiece();
            currentPosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };
            
            // Check for game over
            if (!isValidMove(board, currentPiece, currentPosition)) {
                console.log('Game Over!');
                gameOver = true;
                clearInterval(gameLoop);
            }
        }
    }

    function handleKeydown(event) {
        if (gameOver || paused) return;

        // Prevent default behavior for game control keys
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'p', 'P'].includes(event.key)) {
            event.preventDefault();
        }
        
        switch (event.key) {
            case 'ArrowLeft':
                if (isValidMove(board, currentPiece, { ...currentPosition, x: currentPosition.x - 1 })) {
                    currentPosition = { ...currentPosition, x: currentPosition.x - 1 };
                }
                break;
            case 'ArrowRight':
                if (isValidMove(board, currentPiece, { ...currentPosition, x: currentPosition.x + 1 })) {
                    currentPosition = { ...currentPosition, x: currentPosition.x + 1 };
                }
                break;
            case 'ArrowUp':
                const rotated = {
                    ...currentPiece,
                    shape: currentPiece.shape[0].map((_, i) =>
                        currentPiece.shape.map(row => row[i]).reverse()
                    )
                };
                if (isValidMove(board, rotated, currentPosition)) {
                    currentPiece = rotated;
                }
                break;
            case 'ArrowDown':
                const newPos = { ...currentPosition, y: currentPosition.y + 1 };
                if (isValidMove(board, currentPiece, newPos)) {
                    currentPosition = newPos;
                }
                break;
            case ' ':
                // Hard drop
                while (isValidMove(board, currentPiece, { ...currentPosition, y: currentPosition.y + 1 })) {
                    currentPosition = { ...currentPosition, y: currentPosition.y + 1 };
                }
                break;
            case 'p':
            case 'P':
                paused = !paused;
                break;
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
        startGame();
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeydown);
        if (gameLoop) clearInterval(gameLoop);
    });
</script>

<main>
    <div class="game-container">
        <div class="game-board">
            <GameBoard {board} {currentPiece} {currentPosition} />
        </div>
        <div class="game-sidebar">
            <NextPiece piece={nextPiece} />
            <ScoreBoard {score} {level} {lines} />
            <div class="controls">
                <button on:click={startGame} tabindex="-1">
                    {gameOver ? 'New Game' : paused ? 'Resume' : 'Start'}
                </button>
                {#if !gameOver && !paused}
                    <button on:click={() => paused = true} tabindex="-1">Pause</button>
                {/if}
            </div>
        </div>
        <StathamEffect show={showStathamEffect} />
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 100vh;
        padding: 20px;
        background-color: #1a1a1a;
    }

    .game-container {
        display: flex;
        gap: 30px;
        align-items: flex-start;
        position: relative;
    }

    .game-board {
        background-color: #2a2a2a;
        padding: 10px;
        border-radius: 10px;
        width: 340px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
    }

    .game-sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 200px;
        background-color: #2a2a2a;
        padding: 20px;
        border-radius: 10px;
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
        pointer-events: auto;
        user-select: none;
        width: 100%;
    }

    button:focus {
        outline: none;
    }

    button:hover {
        background-color: #5a5a5a;
    }
</style>
