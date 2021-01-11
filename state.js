//GAME STATE
let turn = "white"
let selectedPieceSquare = null
let moveHistory = []
let moveNumber = 1

//SETTINGS
let playerView = "white"
let whiteSquareColor = "#ffffff"
let blackSquareColor = "#000000"
let selectedPieceColor = "#0cc"

//STATE HELPERS
function toggleTurn() {
  turn = turn === "white" ? "black" : "white"
}
