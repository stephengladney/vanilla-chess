// RESTRICTIONS (must return true)
const IS_DESTINATION_INVALID_SQUARE = ({ destinationColumn, destinationRow }) =>
  !board[`c${destinationColumn}r${destinationRow}`]

const IS_DESTINATION_OCCUPIED = ({ destinationColumn, destinationRow }) =>
  !!board[`c${destinationColumn}r${destinationRow}`].pieceName

const IS_PATH_BLOCKED = (
  currentColumn,
  currentRow,
  destinationColumn,
  destinationRow
) => {
  return false
}

// GLOBAL RESTRICTIONS
const IS_DESTINATION_OCCUPIED_BY_YOU = ({
  destinationRow,
  destinationColumn,
}) =>
  String(board[`c${destinationColumn}r${destinationRow}`].piece).includes(turn)

const IS_KING_IN_CHECK_AFTER = () => false

const GLOBAL_RESTRICTIONS = [
  IS_DESTINATION_INVALID_SQUARE,
  IS_DESTINATION_OCCUPIED_BY_YOU,
  IS_KING_IN_CHECK_AFTER,
]

const pieceRestrictions = {
  bishop: [IS_PATH_BLOCKED, ...GLOBAL_RESTRICTIONS],
  king: [...GLOBAL_RESTRICTIONS],
  knight: [...GLOBAL_RESTRICTIONS],
  rook: [IS_PATH_BLOCKED, ...GLOBAL_RESTRICTIONS],
  pawn: [IS_PATH_BLOCKED, ...GLOBAL_RESTRICTIONS],
  queen: [IS_PATH_BLOCKED, ...GLOBAL_RESTRICTIONS],
}

function doAllRestrictionsPass({
  startingColumn,
  startingRow,
  destinationColumn,
  destinationRow,
  restrictions,
}) {
  let result = true
  restrictions.forEach((restriction) => {
    if (
      restriction({
        startingColumn,
        startingRow,
        destinationColumn,
        destinationRow,
        restrictions,
      })
    )
      result = false
  })
  return result
}
