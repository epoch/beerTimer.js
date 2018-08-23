/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const { createTimer } = __webpack_require__(1)

__webpack_require__(2)
__webpack_require__(4)

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

function msToSecond(ms) {
  return Math.ceil(ms / 1000)
}

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
  timeRemainingDiv.textContent = msToSecond(remaining)
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

form.addEventListener('submit', formSubmitHandler)
refillButton.addEventListener('click', refillClickHandler)
fullScreenSpan.addEventListener('click', toggleFullScreen)


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const noop = () => {}

function createTimer(options, cb = noop) {

  const defaultOptions = {
    ms: 0,
    interval: 250
  }

  options = Object.assign(defaultOptions, options)

  let timerId = null
  let startedAt = null
  let finishedAt = null

  const nowInMillisecond = () => new Date().getTime()

  const publicMethods = {
    
    start: (now = nowInMillisecond()) => {
      if (startedAt) return startedAt

      startedAt = now
      finishedAt = startedAt + options.ms

      timerId = setInterval(() => {

        if (nowInMillisecond() > finishedAt) {
          clearInterval(timerId)
        }

        cb( publicMethods.getTimeRemaining() )

      }, options.interval)

      return startedAt
    },

    getOptions: () => Object.assign({}, options),

    getTimeRemaining: (now = nowInMillisecond()) => {
      if (startedAt === null) {
        return options.ms
      } else {
        return finishedAt - now
      }
    }
  }

  return publicMethods
}

module.exports = {
  createTimer
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=c915a996560ef31db5a8.bundle.js.map