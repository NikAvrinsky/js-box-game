const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $gameTime = document.querySelector('#game-time')
const $time = document.querySelector('#time')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $result = document.querySelector('#result')
const color = ['red', 'blue', 'green', 'yellow', 'pink']
const game = {
  score: 0,
  isStarted: false
}

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
const hide = ($el) => $el.classList.add('hide')
const show = ($el) => $el.classList.remove('hide')

const startGame = () => {
  console.log('Start')
  game.score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', true)
  game.isStarted = true
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

const setGameScore = () => {
  $result.textContent = game.score.toString()
}

const setGameTime = () => {
  const time = +$gameTime.value
  $time.textContent = time
}

const endGame = () => {
  game.isStarted = false
  setGameScore()
  show($start)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''
  hide($timeHeader)
  show($resultHeader)
  $gameTime.removeAttribute('disabled')
}

const handleBoxClick = (event) => {
  if (!game.isStarted) {
    return
  }
  if (event.target.dataset.box) {
    renderBox()
    game.score++
  }
}

const renderBox = () => {
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

$start.addEventListener('click',startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('imput', setGameTime)