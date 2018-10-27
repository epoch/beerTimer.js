const Timer = require('./timer')

function createCountDown(duration, interval = 1000) {

  let _timer = new Timer(duration, now())
  let _onTick = remaining => console.log(remaining)
  let _onExpired = () => console.log("time's up!")
  let running = false
  let timeoutId = null
  
  function now() {
    return Date.now()
  }
  
  function tick() {
    _onTick({ 
      elapsed: _timer.elapsed(), 
      remaining: _timer.timeRemaining()
    })
    
    if (running && _timer.hasTimeRemaining()) {
      _timer = _timer.record(now())
      timeoutId = setTimeout(tick, interval)
    }

    if (_timer.isExpired()) {
      _onExpired()
    }
  }

  // public api ///////////////////////////////////

  function onTick(tickHandler) {
    _onTick = tickHandler
  }

  function onExpired(expiredHandler) {
    _onExpired = expiredHandler
  }

  function start() {
    if (running) return false
    running = true
    _timer = _timer.skip(now())
    tick()
    console.log('started')
  }

  function cancel() {
    clearTimeout(timeoutId)
    _timer = new Timer(duration, now())
    running = false
  }

  function pause() {
    if (!running) return false
    clearTimeout(timeoutId)
    running = false
    console.log('paused')
  }

  function isPaused() {
    return !running
  }

  const publicApi = {
    onTick,
    onExpired,
    start,
    pause,
    cancel,
    isPaused
  }

  return publicApi
}

module.exports = createCountDown
