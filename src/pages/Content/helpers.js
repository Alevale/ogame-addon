export const setAttributes = (el, attrs) => {
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}

let timeouts = {}
export const createNonLinearInterval = (callback, maxWaitingTime, minWaitingTime = 0, intervalName) => {
  let nextExecution
  do {
    nextExecution = (Math.random() * maxWaitingTime)
  } while (nextExecution < minWaitingTime);

  const intervalTimeout = setTimeout(() => {
    const abort = callback()
    if (abort) {
      return
    }
    createNonLinearInterval(callback, maxWaitingTime, minWaitingTime, intervalName);
  }, nextExecution)

  if (intervalName) {
    if (!timeouts[intervalName]) {
      timeouts[intervalName] = []
    }
    timeouts[intervalName].push(intervalTimeout)
  }

}

export const stopAllNonLinearIntervals = () => {
  timeouts.forEach(t => clearTimeout(t))
  timeouts = []
}

export const stopNonLinearIntervals = (intervalName) => {
  if (!intervalName) {
    throw Error('Missing function parameter IntervalName')
  }
  const timeout = timeouts[intervalName]
  // console.log(timeout)
  timeout.forEach(t => clearTimeout(t))
  timeouts[intervalName] = []
}
