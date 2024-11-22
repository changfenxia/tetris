import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOS } from './constants';

export function createBoard() {
    return Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
}

export function getRandomTetromino() {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
}

export function isValidMove(board, piece, position) {
    return piece.shape.every((row, dy) => {
        return row.every((value, dx) => {
            let newX = position.x + dx;
            let newY = position.y + dy;
            
            return (
                value === 0 || // empty space in piece
                (newX >= 0 && // within horizontal bounds
                newX < BOARD_WIDTH &&
                newY < BOARD_HEIGHT && // within vertical bounds
                board[newY] && // row exists
                board[newY][newX] === 0) // position is empty
            );
        });
    });
}

export function addPieceToBoard(board, piece, position) {
    const newBoard = board.map(row => [...row]);
    
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                newBoard[position.y + y][position.x + x] = 1;
            }
        });
    });
    
    return newBoard;
}

export function clearLines(board) {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
        if (row.every(cell => cell === 1)) {
            linesCleared++;
            return false;
        }
        return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    return { newBoard, linesCleared };
}

export function calculateScore(linesCleared, level) {
    const basePoints = [0, 40, 100, 300, 1200];
    return basePoints[linesCleared] * (level + 1);
}

export function calculateLevel(lines) {
    return Math.floor(lines / 10);
}

export function calculateDropTime(level) {
    return Math.max(100, 1000 - (level * 100));
}

export function rotatePiece(piece) {
    const newShape = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
    );
    return { ...piece, shape: newShape };
}
