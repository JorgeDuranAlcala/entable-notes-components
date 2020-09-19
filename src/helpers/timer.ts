
export const IS_SCROLLING_DEBOUNCE_INTERVAL = 150;
const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

export type TimeoutID = {
  id: number
};

export function cancelTimeout(timeoutID: TimeoutID) {
  cancelAnimationFrame(timeoutID.id);
}

export function requestAnimationFrameTimeout(callback: Function, delay: number=IS_SCROLLING_DEBOUNCE_INTERVAL): TimeoutID {
  const start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  const timeoutID: TimeoutID = {
    id: requestAnimationFrame(tick),
  };

  return timeoutID;
}