const createCountDown = require('../src/countDown')

beforeEach((() => {
  const noop = () => {}
  global.countDown = createCountDown(5000, 500)  
}))

test('defaults', () => {
  expect(countDown).toBeTruthy()
})

test('tick handler fire straight after start', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  countDown.onTick(callback)
  expect(callback).not.toBeCalled()

  countDown.start()
  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenCalledWith({
    elapsed: 0,
    remaining: 5000
  })
})

test('tick handler fire after interval', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  countDown.onTick(callback)
  countDown.start()
  jest.advanceTimersByTime(600);

  expect(callback).toBeCalled()
  expect(callback).toHaveBeenCalledTimes(2)
})
