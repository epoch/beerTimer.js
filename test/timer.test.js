const { createTimer } = require('../src/timer')

beforeEach((() => {
  const noop = () => {}
  global.timer = createTimer({ ms: 1000 }, noop)  
}))

test('new timer defaults', () => {
  expect(createTimer({}, () => {}).getOptions()).toEqual({
    ms: 0,
    interval: 250
  })
})

test('getOptions returns a copied object', () => {
  const options = { ms: 1000, interval: 250 }
  expect(timer.getOptions()).toEqual(options)
  timer.getOptions().ms = 98765
  expect(timer.getOptions()).toEqual(options)
})

test('start returns started at', () => {
  expect(timer.start(1000)).toEqual(1000)
})

test('start at defaults to current time', () => {
  expect(timer.start()).toBeLessThanOrEqual(new Date().getTime())
})

test('getTimeRemaining before timer start', () => {
  const timer = createTimer({ ms: 5000 })
  expect(timer.getTimeRemaining()).toEqual(5000)
})

test('getTimeRemaining 300 milliseconds after start', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  const timer = createTimer({ ms: 5000 }, callback)
  timer.start()
  expect(callback).not.toBeCalled()
  jest.advanceTimersByTime(300);
  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(1)
})

test('getTimeRemaining 5000 milliseconds after start', () => {
  const callback = jest.fn();
  const timer = createTimer({ ms: 5000 }, callback)
  timer.start(0)
  expect(timer.getTimeRemaining(5000)).toEqual(0)
})




