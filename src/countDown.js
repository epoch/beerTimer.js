const Timer = require('./timer')

function createCountDown(duration, interval = 1000) {

  let _timer = new Timer(duration, now())
  let _tickHandler = remaining => console.log(remaining)
  let running = false
  let timeoutId = null
  
  function now() {
    return Date.now()
  }
  
  function tick() {
    _tickHandler({ 
      elapsed: _timer.elapsed(), 
      remaining: _timer.timeRemaining()
    })
    
    if (running && _timer.hasTimeRemaining()) {
      _timer = _timer.record(now())
      timeoutId = setTimeout(tick, interval)
    }
  }

  // public api ///////////////////////////////////

  function setTickHandler(tickHandler) {
    _tickHandler = tickHandler
  }

  function start() {
    if (running) return false
    running = true
    _timer = _timer.skip(now())
    tick()
    console.log('started')
  }

  function pause() {
    if (!running) return false
    clearTimeout(timeoutId)
    running = false
    console.log('paused')
  }

  const publicApi = {
    setTickHandler,
    start,
    pause
  }

  return publicApi
}

module.exports = createCountDown
