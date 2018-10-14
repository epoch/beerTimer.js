class Timer {

  constructor(duration, startTime, elapsed = 0) {
    this._startTime = startTime
    this._duration = duration
    this._elapsed = elapsed
  } 

  record(timeStamp) {
    return new Timer(
      this._duration, 
      timeStamp, 
      timeStamp - this._startTime + this._elapsed
    )
  }

  skip(timeStamp) {
    return new Timer(this._duration, timeStamp, this._elapsed)
  }

  timeRemaining() {
    return this._duration - this.elapsed()
  }

  elapsed() {
    return this._elapsed
  }

  hasTimeRemaining() {
    return this.timeRemaining() > 0
  }

  isExpired() {
    return this.elapsed() >= this._duration
  }

}

module.exports = Timer