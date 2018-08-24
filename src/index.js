const { createTimer } = require('./timer')
const strftime = require('strftime')

require('./reset.css')
require('./style.css')

let timer = null
let secondsPerStep = null

const timeRemainingDiv = document.querySelector('.time-remaining')
const cupEmptySpace = document.querySelector('#cup-empty-space')
const startButton = document.querySelector('.start-button')
const refillButton = document.querySelector('.refill-button')
const secondsInput = document.querySelector('.seconds-input')
const minutesInput = document.querySelector('.minutes-input')
const sipIntervalInput = document.querySelector('.sip-interval-input')
const fullScreenSpan = document.querySelector('.fullscreen-span')
const form = document.querySelector('.timer__form')
const countdownSection = document.querySelector('.timer-countdown')

function getEmptySpaceHeight() {
  return document.querySelector('#cup-gap').getBBox().height + 1
}

function calcHeightFromTimeRemaining(remaining) {
  const step = timer.getOptions().ms / 1000 / secondsPerStep
  const heightPerStep =  getEmptySpaceHeight() / step
  return (step - Math.ceil((remaining / 1000) / secondsPerStep)) * heightPerStep
}

function updateDom(remaining) {
  let height = calcHeightFromTimeRemaining(remaining)
  timeRemainingDiv.textContent = strftime('%-M:%S', new Date(remaining + 999))
  cupEmptySpace.style.height = `${height}px`
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
  cupEmptySpace.style.height = '0px'
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
  
  secondsPerStep = sipIntervalInput.value
  let totalSeconds = +secondsInput.value + minutesInput.value * 60

  timer = createTimer(
    { ms:  totalSeconds * 1000 }, 
    updateDom
  )

  form.classList.toggle('hide')
  countdownSection.classList.toggle('hide')
  
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
