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