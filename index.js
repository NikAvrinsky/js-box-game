const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $gameTime = document.querySelector('#game-time')
const $time = document.querySelector('#time')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $result = document.querySelector('#result')
const color = ['red', 'blue', 'green', 'yellow', 'pink']

var score = 0
var isGameStarted = false

$start.addEventListener('click',startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('imput', setGameTime)

function hide($el) {
  $el.classList.add('hide')
}

function show($el) {
  $el.classList.remove('hide')
}

function startGame() {
  console.log('Start')
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', true)
  isGameStarted = true
  hide($resultHeader)
  show($timeHeader)
  hide($start)
  $game.style.backgroundColor = '#fff'

  const interval = setInterval(function() {
    const time = parseFloat($time.textContent)

    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  var time = +$gameTime.value
  $time.textContent = time
}

function endGame() {
  isGameStarted = false
  setGameScore()
  show($start)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  hide($timeHeader)
  show($resultHeader)
  $gameTime.removeAttribute('disabled')


}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return
  }

  if (event.target.dataset) {
    renderBox()
    score++
  }
}

function renderBox() {
  $game.innerHTML = ''
  const box = document.createElement('div')
  const boxSize = getRandom(30, 100)
  const gameSize = $game.getBoundingClientRect()
  const maxTop = gameSize.height - boxSize
  const maxLeft = gameSize.width - boxSize
  const randomColorIndex = parseInt(getRandom(0, color.length))

  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = color[randomColorIndex]
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
  
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}