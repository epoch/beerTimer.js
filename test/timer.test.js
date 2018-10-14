const Timer = require('../src/timer')

beforeEach((() => {
  global.timer = new Timer(5000, 0, 0)  
}))

test('elapsed', () => {
  expect(timer.elapsed()).toEqual(0)
})

test('time remaining', () => {
  expect(timer.timeRemaining()).toEqual(5000)
})

test('isExpired', () => {
  expect(timer.isExpired()).toEqual(false)
})

test('has time remaining', () => {
  expect(timer.hasTimeRemaining()).toEqual(true)
})

test('record 1000 ms', () => {
  let newTimer = timer.record(1000)
  expect(newTimer.elapsed()).toEqual(1000)
  expect(newTimer.timeRemaining()).toEqual(4000)
})

test('skip 1000 ms', () => {
  expect(timer.skip(1000).elapsed()).toEqual(0)
})

test('record 5000 ms', () => {
  let newTimer = timer.record(5000)
  expect(newTimer.elapsed()).toEqual(5000)
  expect(newTimer.timeRemaining()).toEqual(0)
  expect(newTimer.isExpired()).toEqual(true)
})




