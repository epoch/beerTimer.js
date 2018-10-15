const strftime = require('strftime')
const createCountDown = require('./countDown')
const finishAudio = new Audio(require('./boxingBell.mp3'))

require('./reset.css')
require('./style.css')

window.timer = null
let secondsPerStep = null
let totalSeconds = null

const timeRemainingDiv = document.querySelector('.time-remaining')
const cupEmptySpace = document.querySelector('#cup-empty-space')
const refillButton = document.querySelector('.refill-button')
const secondsInput = document.querySelector('.seconds-input')
const minutesInput = document.querySelector('.minutes-input')
const sipIntervalInput = document.querySelector('.sip-interval-input')
const fullScreenSpan = document.querySelector('.fullscreen-span')
const form = document.querySelector('.timer__form')
const countdownSection = document.querySelector('.timer-countdown')

function msToSec(ms) {
  return ms / 1000
}

function getEmptySpaceHeight() {
  const padding = 1 // 
  return document.querySelector('#cup-gap').getBBox().height + padding
}

function calcHeightFromTimeRemaining(remaining) {
  const numOfStep = totalSeconds / secondsPerStep
  const heightPerStep =  getEmptySpaceHeight() / numOfStep
  const heightMultiplier = numOfStep - Math.ceil( Math.floor(msToSec(remaining)) / secondsPerStep)

  return heightMultiplier * heightPerStep
}

function playAudio() {
  finishAudio.play()
}

function updateDom({ remaining }) {
  if (Math.floor(msToSec(remaining)) < 10) {
    timeRemainingDiv.classList.add('warning')
    timeRemainingDiv.textContent = strftime('%-S', new Date(remaining))
  } else {
    timeRemainingDiv.textContent = strftime('%-M:%S', new Date(remaining))
  }
  
  let height = Math.abs(calcHeightFromTimeRemaining(remaining))
  cupEmptySpace.setAttribute('height', `${height}px`)

  if (remaining < 0) {
    refillButton.classList.toggle('hide')
    timeRemainingDiv.classList.toggle('hide')
  }
}

function refillClickHandler(e) {
  e.target.classList.add('hide')

  form.classList.toggle('hide')
  countdownSection.classList.toggle('hide')
  timeRemainingDiv.classList.toggle('hide')

  timeRemainingDiv.textContent = ''
  cupEmptySpace.setAttribute('height', '0px')
}

function toggleFullScreen() {
  if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen()
  } else {
    document.documentElement.webkitRequestFullscreen()
  }
}

function formSubmitHandler(e) {
  e.preventDefault()

  form.classList.toggle('hide')
  countdownSection.classList.toggle('hide')
  timeRemainingDiv.classList.remove('warning')

  secondsPerStep = sipIntervalInput.value
  totalSeconds = +secondsInput.value + minutesInput.value * 60

  timer = createCountDown(totalSeconds * 1000, 250)
  timer.onTick(updateDom)
  timer.onExpired(playAudio)
  timer.start()
}

refillButton.addEventListener('click', refillClickHandler)
fullScreenSpan.addEventListener('click', toggleFullScreen)
form.addEventListener('submit', formSubmitHandler)
form.addEventListener('focus', e => {
  if (e.target.tagName === 'INPUT') {
    e.target.select()
  }
}, true)
