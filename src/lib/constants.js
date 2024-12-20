export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const BLOCK_SIZE = 30;

export const STATHAM_QUOTES = [
    "Ты удалил этот ряд, как настоящий профессионал!",
    "Ты прирожденный игрок, приятель!",
    "Этот ход был круче, чем мои фильмы.",
    "Транспортировщик линий!",
    "Взял нож - режь, взял дошик - ешь.",
    "Я живу, как карта ляжет. Ты живёшь, как мамка скажет.",
    "Если заблудился в лесу, иди домой.",
    "Никогда не сдавайтесь, идите к своей цели! А если будет сложно – сдавайтесь",
    "Работа — это не волк. Работа — ворк. А волк — это ходить.",
    "Если тебе где-то не рады в рваных носках, то и в целых туда идти не стоит.",
    "Без подошвы тапочки — это просто тряпочки.",
    "Я вообще делаю что хочу. Хочу импланты — звоню врачу.",
    "В жизни всегда есть две дороги: одна — первая, а другая — вторая.",
];

export const STATHAM_IMAGES = [
    'images/statham1.jpg',
    'images/statham2.jpg',
    'images/statham3.jpg',
    'images/statham4.jpg',
];

export const STATHAM_FACE = 'images/statham-face.jpg';
export const STATHAM_FACE_BIG = 'images/statham-face-big.jpg';

export const TETROMINOS = {
    I: {
        shape: [
            [1, 1, 1, 1]
        ],
        color: '#00f0f0'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#f0f000'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        color: '#a000f0'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: '#00f000'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: '#f00000'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#0000f0'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#f0a000'
    }
};
