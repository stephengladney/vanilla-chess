document.getElementById("view_selector").addEventListener("change", (e) => {
  playerView = e.target.value
  drawBoard({
    board,
    whiteSquareColor,
    blackSquareColor,
    playerView,
  })
})

document
  .getElementById("square_color_selector_black")
  .addEventListener("change", (e) => {
    blackSquareColor = e.target.value
    drawBoard({
      board,
      whiteSquareColor,
      blackSquareColor,
    })
  })
document
  .getElementById("square_color_selector_white")
  .addEventListener("change", (e) => {
    whiteSquareColor = e.target.value
    drawBoard({
      board,
      whiteSquareColor,
      blackSquareColor,
      playerView: e.target.value,
    })
  })
