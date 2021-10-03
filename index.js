const rl = require('readline-sync');
const { Chess } = require('chess.js');

let chess;

const moves = {
    'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1': ['d5', 'Nf6'],
    'rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2': 'Nf6',
    'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3': ['e6', 'c5', 'Nc6', 'Bf5'],
    'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R b KQkq - 1 4': 'Bd6',
    'rnbqk2r/ppp2ppp/3bpn2/3p4/3P4/4PNB1/PPP2PPP/RN1QKB1R b KQkq - 3 5': ['O-O', 'Bxg3'],
    'rnbqkb1r/pp2pppp/5n2/2pp4/3P1B2/2P1P3/PP3PPP/RN1QKBNR b KQkq - 0 4': 'Nc6',
    'r1bqkb1r/pp2pppp/2n2n2/2pp4/3P1B2/2P1P3/PP1N1PPP/R2QKBNR b KQkq - 2 5': 'Qb6',
    'r1b1kb1r/pp2pppp/1qn2n2/2pp4/3P1B2/1QP1P3/PP1N1PPP/R3KBNR b KQkq - 4 6': 'c4',
    'r1bqkb1r/ppp1pppp/2n2n2/3p4/3P1B2/2P1P3/PP3PPP/RN1QKBNR b KQkq - 0 4': 'Bf5',
    'r2qkb1r/ppp1pppp/2n2n2/3p1b2/3P1B2/2PBP3/PP3PPP/RN1QK1NR b KQkq - 2 5': 'Bxd3',
    'rn1qkb1r/ppp1pppp/5n2/3p1b2/2PP1B2/4P3/PP3PPP/RN1QKBNR b KQkq - 0 4': ['e6', 'c6'],
    'rn1qkb1r/ppp2ppp/4pn2/3p1b2/2PP1B2/1Q2P3/PP3PPP/RN2KBNR b KQkq - 1 5': 'b6',
    'rn1qkb1r/pp2pppp/2p2n2/3p1b2/2PP1B2/1Q2P3/PP3PPP/RN2KBNR b KQkq - 1 5': 'Qb6',
    'rnbqk2r/ppp2ppp/4pn2/3p4/3P4/4PNP1/PPP2PP1/RN1QKB1R b KQkq - 0 6': 'h6',
    'rnbqkb1r/pppppppp/5n2/8/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2': ['g6', 'c5'],
    'rnbqkb1r/pppppp1p/5np1/8/3P1B2/2N5/PPP1PPPP/R2QKBNR b KQkq - 1 3': 'Bg7',
    'rnbqk2r/ppppppbp/5np1/8/3P1B2/2N5/PPPQPPPP/R3KBNR b KQkq - 3 4': ['O-O', 'd6'],
    'rnbqk2r/ppp1ppbp/3p1npB/8/3P4/2N5/PPPQPPPP/R3KBNR b KQkq - 1 5': ['O-O', 'Bxh6'],
    'rnbq1rk1/ppp1ppBp/3p1np1/8/3P4/2N5/PPPQPPPP/R3KBNR b KQ - 0 6': 'Kxg7',
    'rnbqk2r/ppp1pp1p/3p1npQ/8/3P4/2N5/PPP1PPPP/R3KBNR b KQkq - 0 6': 'Nc6',
    'rnbqkb1r/pp1ppppp/5n2/2p5/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3': 'Qb6',
    'rnb1kb1r/pp1ppppp/1q3n2/2p5/3P1B2/N3P3/PPP2PPP/R2QKBNR b KQkq - 2 4': 'Qxb2',
    'rnb1kb1r/pp1ppppp/5n2/1Np5/3P1B2/4P3/PqP2PPP/R2QKBNR b KQkq - 1 5': ['Nd5', 'Na6'],
    'rnb1kb1r/pp1ppppp/8/1Npn4/3P1B2/P3P3/1qP2PPP/R2QKBNR b KQkq - 0 6': 'a6',
    'rnb1kb1r/1p1ppppp/p7/1Npn4/3P1B2/P3P3/1qP2PPP/1R1QKBNR b Kkq - 1 7': 'Qa2',
    'rnb1kb1r/1p1ppppp/p7/1Npn4/3P1B2/P3P3/q1P2PPP/1RQ1KBNR b Kkq - 3 8': 'axb5',
    'rnb1kb1r/1p1ppppp/8/1ppn4/3P1B2/P3P3/q1P2PPP/R1Q1KBNR b Kkq - 1 9': 'Qxa1',
    'r1b1kb1r/pp1ppppp/n4n2/1Np5/3P1B2/P3P3/1qP2PPP/R2QKBNR b KQkq - 0 6': 'Nd5',
    'r1b1kb1r/pp1ppppp/n7/1Npn4/3P1B2/P3P3/1qP2PPP/1R1QKBNR b Kkq - 2 7': 'Qa2',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1': ['e4', 'd4'],
    'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2': 'd4',
    'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3': ['e5', 'exd5', 'Nc3', 'f3'],
    'rnbqkbnr/pp2pppp/8/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4': ['c3', 'dxc5'],
    'r1bqkbnr/pp2pppp/2n5/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR w KQkq - 1 5': 'Nf3',
    'r2qkbnr/pp2pppp/2n5/2ppP3/3P2b1/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6': 'Be2',
    'r2qkbnr/pp3ppp/2n1p3/2ppP3/3P2b1/2P2N2/PP2BPPP/RNBQK2R w KQkq - 0 7': 'O-O',
    'r1bqkbnr/pp2pppp/2n5/2PpP3/8/8/PPP2PPP/RNBQKBNR w KQkq - 1 5': 'Nf3',
    'r2qkbnr/pp2pppp/2n5/2PpP3/6b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 3 6': 'Bb5',
    'rnbqkbnr/pp2pppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4': ['Bd3', 'c4'],
    'rnbqkb1r/pp2pppp/5n2/3p4/3P4/3B4/PPP2PPP/RNBQK1NR w KQkq - 2 5': 'c3',
    'r1bqkb1r/pp2pppp/2n2n2/3p4/3P4/2PB4/PP3PPP/RNBQK1NR w KQkq - 1 6': 'Bf4',
    'rnbqkb1r/pp2pppp/5n2/3p4/2PP4/8/PP3PPP/RNBQKBNR w KQkq - 1 5': 'Nc3',
    'rnbqkb1r/pp2pp1p/5np1/3p4/2PP4/2N5/PP3PPP/R1BQKBNR w KQkq - 0 6': 'Nf3',
    'rnbqkbnr/pp2pppp/2p5/8/3Pp3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4': 'Nxe4',
    'rnbqkb1r/pp2pppp/2p2n2/8/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5': ['Nxf6', 'Ng3'],
    'rnbqkb1r/pp3ppp/2p2p2/8/3P4/8/PPP2PPP/R1BQKBNR w KQkq - 0 6': 'Nf3',
    'rnbqk2r/pp3ppp/2pb1p2/8/3P4/5N2/PPP2PPP/R1BQKB1R w KQkq - 2 7': 'Bd3',
    'rnbq1rk1/pp3ppp/2pb1p2/8/3P4/3B1N2/PPP2PPP/R1BQK2R w KQ - 4 8': 'O-O',
    'rnbqkbnr/pp2pp1p/2p3p1/3p4/3PP3/5P2/PPP3PP/RNBQKBNR w KQkq - 0 4': 'Nc3',
    'rnbqk1nr/pp2ppbp/2p3p1/3p4/3PP3/2N2P2/PPP3PP/R1BQKBNR w KQkq - 2 5': 'Be3',
    'rn1qkb1r/pp2pppp/2p2n2/8/3P2b1/6N1/PPP2PPP/R1BQKBNR w KQkq - 3 6': ['Be2', 'Nf3'],
    'rn1qkb1r/pp2pppp/2p2n2/8/3P4/6N1/PPP1bPPP/R1BQK1NR w KQkq - 0 7': 'N1xe2',
    'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2': ['c4', 'Bf4', 'Nf3'],
    'r1bqkb1r/pppppppp/2n2n2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3': ['Nc3', 'd5', 'Nf3'],
    'r1bqkb1r/pppp1ppp/2n2n2/4p3/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4': ['d5', 'dxe5'],
    'r1bqkb1r/ppppnppp/5n2/3Pp3/2P5/2N5/PP2PPPP/R1BQKBNR w KQkq - 1 5': 'e4',
    'r1bqkb1r/pppp1ppp/5nn1/3Pp3/2P1P3/2N5/PP3PPP/R1BQKBNR w KQkq - 1 6': 'Bd3',
    'r1bqk2r/pppp1ppp/5nn1/2bPp3/2P1P3/2NB4/PP3PPP/R1BQK1NR w KQkq - 3 7': 'Nge2',
    'r1bqk2r/pppp1ppp/6n1/2bPp3/2P1P1n1/2NB4/PP2NPPP/R1BQK2R w KQkq - 5 8': 'O-O',
    'r1b1k2r/pppp1ppp/6n1/2bPp3/2P1P1nq/2NB4/PP2NPPP/R1BQ1RK1 w kq - 7 9': 'h3',
    'r1bqkb1r/pppppppp/5n2/3Pn3/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 1 4': 'e3',
    'r1bqkb1r/pppp1ppp/2n1pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4': 'Nc3',
    'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 0 3': 'e3',
    'rnbqkb1r/pp2pppp/5n2/2pp4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4': 'c3',
    'r1bqkb1r/pp2pppp/2n2n2/2pp4/3P1B2/2P1P3/PP3PPP/RN1QKBNR w KQkq - 1 5': 'Nf3',
    'r1b1kb1r/pp2pppp/1qn2n2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R w KQkq - 3 6': 'Qb3',
    'r1b1kb1r/pp2pppp/1qn2n2/3p4/2pP1B2/1QP1PN2/PP3PPP/RN2KB1R w KQkq - 0 7': ['Qxb6', 'Qc2'],
    'r1b1kb1r/1p2pppp/1pn2n2/3p4/2pP1B2/2P1PN2/PP3PPP/RN2KB1R w KQkq - 0 8': 'Nbd2',
    'r3kb1r/pp2pppp/1qn2n2/3p1b2/2pP1B2/2P1PN2/PPQ2PPP/RN2KB1R w KQkq - 2 8': 'Qc1',
    'rnbqkb1r/pppppp1p/5np1/8/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3': ['c4', 'Bf4'],
    'rnbqk2r/ppppppbp/5np1/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 1 4': 'Nc3',
    'rnbqkb1r/ppp1pp1p/5np1/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R w KQkq - 0 4': 'e3',
};

const ends = [
    'rnbq1rk1/ppp2ppp/3bpn2/3p4/3P4/3BPNB1/PPP2PPP/RN1QK2R b KQ - 5 6',
    'r1b1kb1r/pp2pppp/1qn2n2/3p4/2pP1B2/2P1P3/PPQN1PPP/R3KBNR b KQkq - 1 7',
    'r2qkb1r/ppp1pppp/2n2n2/3p4/3P1B2/2PQP3/PP3PPP/RN2K1NR b KQkq - 0 6',
    'rn1qkb1r/p1p2ppp/1p2pn2/3p1b2/2PP1B2/1QN1P3/PP3PPP/R3KBNR b KQkq - 1 6',
    'rn2kb1r/pp2pppp/1qp2n2/2Pp1b2/3P1B2/1Q2P3/PP3PPP/RN2KBNR b KQkq - 0 6',
    'rnbqk2r/ppp2pp1/4pn1p/3p4/3P4/3BPNP1/PPP2PP1/RN1QK2R b KQkq - 1 7',
    'rnbq1rk1/ppppppbp/5np1/8/3P1B2/2N5/PPPQPPPP/2KR1BNR b - - 5 5',
    'rnbq1r2/ppp1ppkp/3p1np1/8/3P3P/2N5/PPPQPPP1/R3KBNR b KQ - 0 7',
    'r1bqk2r/ppp1pp1p/2np1npQ/8/3P4/2N5/PPP1PPPP/2KR1BNR b kq - 2 7',
    'rnb1kb1r/1p1ppppp/8/1ppn4/3P1B2/P3P3/2P2PPP/Q3KBNR b Kkq - 0 10',
    'r1b1kb1r/pp1ppppp/n7/1Npn4/3P1B2/PR2P3/q1P2PPP/3QKBNR b Kkq - 4 8',
    'r2qkb1r/pp2nppp/2n1p3/2ppP3/3P2b1/2P2N2/PP2BPPP/RNBQ1RK1 w kq - 2 8',
    'r2qkbnr/pp3ppp/2n1p3/1BPpP3/6b1/5N2/PPP2PPP/RNBQK2R w KQkq - 0 7',
    'r1bqkb1r/pp2pp1p/2n2np1/3p4/3P1B2/2PB4/PP3PPP/RN1QK1NR w KQkq - 0 7',
    'rnbqk2r/pp2ppbp/5np1/3p4/2PP4/2N2N2/PP3PPP/R1BQKB1R w KQkq - 2 7',
    'rnbqr1k1/pp3ppp/2pb1p2/8/3P4/3B1N2/PPP2PPP/R1BQ1RK1 w - - 6 9',
    'rnb1k1nr/pp2ppbp/1qp3p1/3p4/3PP3/2N1BP2/PPP3PP/R2QKBNR w KQkq - 4 6',
    'rn1qkb1r/pp3ppp/2p1pn2/8/3P4/6N1/PPP1NPPP/R1BQK2R w KQkq - 0 8',
    'rn1qkb1r/pp3ppp/2p1pn2/8/3P2b1/5NN1/PPP2PPP/R1BQKB1R w KQkq - 0 7',
    'r1b1k2r/pppp1ppp/6n1/2bPp3/2P1P2q/2NB3P/PP2NnP1/R1BQ1RK1 w kq - 0 10',
    'r1bqkb1r/pppp1ppp/4pn2/3Pn3/2P5/4P3/PP3PPP/RNBQKBNR w KQkq - 0 5',
    'r1bqk2r/pppp1ppp/2n1pn2/8/1bPP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 2 5',
    'r1bqkb1r/pppp1ppp/5n2/4n3/2P5/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5',
    'r1b1kb1r/1p2pppp/2n2n2/1p1p4/2pP1B2/2P1PN2/PP1N1PPP/R3KB1R w KQkq - 0 9',
    'r3kb1r/pp3ppp/1qn1pn2/3p1b2/2pP1B2/2P1PN2/PP3PPP/RNQ1KB1R w KQkq - 0 9',
    'rnbqk2r/ppp1ppbp/3p1np1/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    'rnbqk2r/ppp1ppbp/5np1/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 1 5'
];

const returnMove = fen => {
    const convertedFen = fen.replace(/[\w]+(?=\s\d+\s\d+$)/, '-');
    const foundPosition = moves[convertedFen];
    if (foundPosition === undefined) {
        return ends.includes(convertedFen) ? true : false;
    }
    return typeof foundPosition === 'string' ? foundPosition : foundPosition[Math.floor(Math.random() * (foundPosition.length))];
}

const printMoves = moves => moves.reduce((x, y) => x += ` ${y}`, '').trim();

const game = () => {
    const key = rl.keyIn('Press y to start or n to quit.', {limit: 'yn'});
    if (key === 'n') return;
    let active = true;
    chess = new Chess();
    if (Math.random() < 0.5) chess.move(returnMove(chess.fen()));
    do {
        console.log(printMoves(chess.history()), '\n', chess.ascii());
        const userMove = rl.question('Move: ');
        const valid = chess.move(userMove);
        if (valid === null) {
            console.log('Not a valid move.');
            active = false;
            break;
        }
        const oppMove = returnMove(chess.fen());
        if (oppMove === true) {
            console.log('Correct!');
            active = false;
        } else if (oppMove === false) {
            console.log('Incorrect.');
            chess.undo();
            console.log(chess.fen().replace(/[\w]+(?=\s\d+\s\d+$)/, '-'));
            active = false;
        } else {
            chess.move(oppMove);
        }
    } while (active);
    game();
}

game();