let redTurn
let blueTurn

const RED_CLASS = 'red'
const RED_CLASS_WIN = 'RED'

const BLUE_CLASS = 'blue'
const BLUE_CLASS_WIN = 'BLUE'

const allCells = document.querySelectorAll('.cell')
const resetButton = document.getElementById('reset')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


startGame()


resetButton.addEventListener('click', startGame)


function startGame() {

  redTurn = false

  allCells.forEach(cell => {

    winningMessageTextElement.innerText = ``
    cell.classList.remove('red')
    cell.classList.remove('blue')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })

  })

}


function handleClick(e) {

  const cell = e.target
  const currentClass = redTurn ? RED_CLASS : BLUE_CLASS

  placeMark(cell, currentClass)

  if (checkWin(currentClass)) {
    endGame(false)
  }
  else if (isDraw()) {
    endGame(true)
  }
  else {
    swapTurns()
  }

}


function placeMark(cell, currentClass) {

  cell.classList.add(currentClass)

}


function swapTurns() {

  redTurn = !redTurn

}


function endGame(draw) {

  const currentClass = redTurn ? RED_CLASS_WIN : BLUE_CLASS_WIN

  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'

  }
  else {

    winningMessageTextElement.innerText = `${currentClass} WINS!`
  }

  winningMessageElement.classList.add('show')
}


function isDraw() {

  return [...allCells].every(cell => {

    return cell.classList.contains(RED_CLASS) || cell.classList.contains(BLUE_CLASS)
  })

}



function checkWin(currentClass) {

  return WINNING_COMBOS.some(combination => {

    return combination.every(index => {

      return allCells[index].classList.contains(currentClass)
    })
  })

}