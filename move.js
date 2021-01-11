function movePiece({ startingSquare, endingSquare }) {
  const moveData = {
    moveNumber,
    piece: board[startingSquare].piece,
    startingSquare,
    endingSquare,
  }
  const pieceName = /[a-z]+-([a-z]+)-./g.exec(moveData.piece)[1]

  const {
    columnNumber: startingColumn,
    rowNumber: startingRow,
  } = getSquareColumnAndRowNumbers(startingSquare)

  const {
    columnNumber: destinationColumn,
    rowNumber: destinationRow,
  } = getSquareColumnAndRowNumbers(endingSquare)

  if (
    doAllRestrictionsPass({
      startingColumn,
      startingRow,
      destinationColumn,
      destinationRow,
      restrictions: pieceRestrictions[pieceName],
    })
  ) {
    board[endingSquare].piece = board[startingSquare].piece
    board[startingSquare].piece = undefined
    moveHistory.push(moveData)
    renderMoveNotationToHistory()
    moveNumber++
    toggleTurn()
    selectedPieceSquare = null
    drawBoard()
  } else {
    alert("Cannot make this move")
  }
}

function renderMoveNotationToHistory() {
  const moveNotationHistory = []
  moveHistory.forEach((move, i) => {
    const whoseTurn = i % 2 === 0 ? "white" : "black"
    if (whoseTurn === "white")
      moveNotationHistory.push([
        getMoveNotation(move),
        getMoveNotation(moveHistory[i + 1]),
      ])
  })

  document.getElementById("move_history").innerHTML = moveNotationHistory
    .map((moves, i) => `<div>${i + 1}. ${moves.join(" ")}</div>`)
    .join("  ")
}

function getMoveNotation(moveData) {
  if (!moveData) return
  let pieceLetter = ""
  if (String(moveData.piece).toLowerCase().includes("rook")) pieceLetter = "R"
  if (String(moveData.piece).toLowerCase().includes("bishop")) pieceLetter = "B"
  if (String(moveData.piece).toLowerCase().includes("knight")) pieceLetter = "N"
  if (String(moveData.piece).toLowerCase().includes("queen")) pieceLetter = "Q"
  if (String(moveData.piece).toLowerCase().includes("king")) pieceLetter = "K"
  return `${pieceLetter}${convertCodeSquareToChessSquare(
    moveData.endingSquare
  )}`
}

function undoMove() {
  const lastMove = moveHistory.slice(-1)
}
