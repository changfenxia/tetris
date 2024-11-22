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

export function moveDown(board, piece, position) {
    const newPosition = { ...position, y: position.y + 1 };
    if (isValidMove(board, piece, newPosition)) {
        return newPosition;
    }
    return false;
}

export function mergePiece(board, piece, position) {
    const newBoard = board.map(row => [...row]);
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                if (newBoard[y + position.y] && newBoard[y + position.y][x + position.x] !== undefined) {
                    newBoard[y + position.y][x + position.x] = value;
                }
            }
        });
    });
    return newBoard;
}

export function clearLines(board) {
    let newBoard = board.filter(row => !row.every(cell => cell));
    const clearedLines = board.length - newBoard.length;
    
    // Add new empty lines at the top
    while (newBoard.length < board.length) {
        newBoard.unshift(new Array(board[0].length).fill(0));
    }
    
    return {
        board: newBoard,
        linesCleared: clearedLines
    };
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
