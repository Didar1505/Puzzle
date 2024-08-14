const puzzle = document.getElementById('puzzle');
const shuffleButton = document.getElementById('shuffle-button');
const pieces = [];
const imageUrl = "image.jpg"; // Replace with your image URL
// Create puzzle pieces
for (let i = 0; i < 9; i++) {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.style.backgroundImage = `url(${imageUrl})`;
    piece.style.backgroundSize = '300px 300px';
    piece.style.backgroundPosition = `${-100 * (i % 3)}px ${-100 * Math.floor(i / 3)}px`;
    pieces.push(piece);
    puzzle.appendChild(piece);
}

// Shuffle function
function shuffle() {
    pieces.sort(() => Math.random() - 0.5);
    puzzle.innerHTML = '';
    pieces.forEach(piece => puzzle.appendChild(piece));
}

// Add click event to shuffle button
shuffleButton.addEventListener('click', shuffle);

let selectedPiece = null;

function swapPieces(piece1, piece2) {
    const tempPosition = piece1.style.backgroundPosition;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece2.style.backgroundPosition = tempPosition;
}

function handlePieceSelection(e) {
    const piece = e.target;
    if (piece.className === 'puzzle-piece') {
        if (selectedPiece) {
            swapPieces(selectedPiece, piece);
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
        } else {
            selectedPiece = piece;
            piece.classList.add('selected');
        }
    }
}

// Add event listeners for both mouse and touch events
puzzle.addEventListener('mousedown', handlePieceSelection);
puzzle.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent scrolling on touch
    handlePieceSelection(e.touches[0]);
}, { passive: false });

// Initial shuffle
shuffle();