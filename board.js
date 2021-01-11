const columnsToRender = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

function createRange(start, stop) {
  const result = []
  for (let i = start; i <= stop; i++) {
    result.push(i)
  }
  return result
}

function createBoard(rows = 8, columns = 8) {
  const result = {}
  const rowsToRender = createRange(1, rows)
    .map((n) => String(n))
    .reverse()
  // columnsToRender.slice(0, columns)

  rowsToRender.forEach((row, i) => {
    const firstColor = i % 2 !== 0 ? "black" : "white"
    const oppositeOfFirstColor = firstColor === "white" ? "black" : "white"
    createRange(1, columns).forEach((column, j) => {
      const squareColor = j % 2 !== 0 ? oppositeOfFirstColor : firstColor
      result[`c${column}r${row}`] = {
        squareColor,
        name: convertCodeSquareToChessSquare(`c${column}r${row}`),
        piece: null,
      }
    })
  })
  return result
}

function drawBoard() {
  let squaresToRender = []

  for (let squareKey in board) {
    const square = board[squareKey]
    const isWhitePiece = square.piece?.includes("white")
    const isPieceSelected =
      selectedPieceSquare && selectedPieceSquare === squareKey
    const backgroundColor =
      square.squareColor === "black" ? blackSquareColor : whiteSquareColor
    const pieceContainerColor = isWhitePiece ? "#fff" : "#000"
    const pieceBorderThickness = isPieceSelected ? "6px" : "1px"
    const textColor = isWhitePiece ? "#000" : "#fff"

    squaresToRender.push(
      `<div id="${squareKey}" class="cell" style="background:${backgroundColor};" onClick="handleSquareClick('${squareKey}')">${
        square.piece
          ? `<span class="piece ${
              isPieceSelected ? "selected" : ""
            }" onClick="handlePieceClick('${squareKey}')" style="background: ${pieceContainerColor}; border: ${pieceBorderThickness} solid; color: ${textColor};">${
              getPieceDisplayName(square.piece) || ""
            }</span>`
          : ""
      }</div>`
    )
  }
  if (String(playerView).toLowerCase() === "black") squaresToRender.reverse()
  document.getElementById("board").innerHTML = squaresToRender.join("")
}

function convertChessSquareToCodeSquare(square) {
  const columnLetter = /([a-z]+)\d+/g.exec(square)[1]
  const columnNumber =
    columnsToRender.findIndex(
      (_columnLetter) => _columnLetter === columnLetter
    ) + 1
  const rowNumber = square.substr(1)
  return `c${columnNumber}r${rowNumber}`
}

function getSquareColumnAndRowNumbers(square) {
  const executedRegEx = /c(\d+)r(\d+)/g.exec(square)
  const columnNumber = executedRegEx[1]
  const rowNumber = executedRegEx[2]
  return { columnNumber, rowNumber }
}

function convertCodeSquareToChessSquare(square) {
  const { columnNumber, rowNumber } = getSquareColumnAndRowNumbers(square)
  const columnLetter = columnsToRender[columnNumber - 1]
  return `${columnLetter}${rowNumber}`
}

function addPieces(pieceAndPositionPairs) {
  pieceAndPositionPairs.forEach((data) => {
    const square = convertChessSquareToCodeSquare(data.square)
    board[square].piece = data.piece
  })
}

const addBishops = () =>
  addPieces([
    { square: "c1", piece: "white-bishop-dark" },
    { square: "f1", piece: "white-bishop-light" },
    { square: "c8", piece: "black-bishop-light" },
    { square: "f8", piece: "black-bishop-dark" },
  ])

const addKings = () =>
  addPieces([
    { square: "e1", piece: "white-king" },
    { square: "e8", piece: "black-king" },
  ])

const addQueens = () =>
  addPieces([
    { square: "d1", piece: "white-queen" },
    { square: "d8", piece: "black-queen" },
  ])

const addKnights = () => {
  addPieces([
    { square: "b1", piece: "white-knight-left" },
    { square: "g1", piece: "white-knight-right" },
    { square: "b8", piece: "black-knight-right" },
    { square: "g8", piece: "black-knight-left" },
  ])
}

const addRooks = () =>
  addPieces([
    { square: "a1", piece: "white-rook-left" },
    { square: "h1", piece: "white-rook-right" },
    { square: "a8", piece: "black-rook-right" },
    { square: "h8", piece: "black-rook-left" },
  ])

const addPawns = () =>
  addPieces([
    { square: "a2", piece: "white-pawn-1" },
    { square: "b2", piece: "white-pawn-2" },
    { square: "c2", piece: "white-pawn-3" },
    { square: "d2", piece: "white-pawn-4" },
    { square: "e2", piece: "white-pawn-5" },
    { square: "f2", piece: "white-pawn-6" },
    { square: "g2", piece: "white-pawn-7" },
    { square: "h2", piece: "white-pawn-8" },
    { square: "a7", piece: "black-pawn-8" },
    { square: "b7", piece: "black-pawn-7" },
    { square: "c7", piece: "black-pawn-6" },
    { square: "d7", piece: "black-pawn-5" },
    { square: "e7", piece: "black-pawn-4" },
    { square: "f7", piece: "black-pawn-3" },
    { square: "g7", piece: "black-pawn-2" },
    { square: "h7", piece: "black-pawn-1" },
  ])

function addStartingPieces() {
  addBishops()
  addKings()
  addKnights()
  addPawns()
  addQueens()
  addRooks()
}

function handlePieceClick(square) {
  selectedPieceSquare = selectedPieceSquare === square ? undefined : square
  drawBoard({ board, blackSquareColor, whiteSquareColor })
}

const board = createBoard(8, 8)
addStartingPieces()
drawBoard()

function getPieceDisplayName(pieceName) {
  if (String(pieceName).toLowerCase().includes("pawn")) return "p"
  if (String(pieceName).toLowerCase().includes("rook")) return "R"
  if (String(pieceName).toLowerCase().includes("knight")) return "N"
  if (String(pieceName).toLowerCase().includes("bishop")) return "B"
  if (String(pieceName).toLowerCase().includes("king")) return "K"
  if (String(pieceName).toLowerCase().includes("queen")) return "Q"
}

function handleSquareClick(square) {
  if (square == selectedPieceSquare || !selectedPieceSquare) return
  if (!!selectedPieceSquare) {
    movePiece({
      startingSquare: selectedPieceSquare,
      endingSquare: square,
    })
  }
}
