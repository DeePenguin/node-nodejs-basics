import { parentPort, workerData } from 'node:worker_threads';

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // Uncomment this to simulate random errors
  // if (Math.random() > 0.7) {
  //   throw new Error('Simulated error');
  // }

  parentPort.postMessage(nthFibonacci(workerData));
};

sendResult();
