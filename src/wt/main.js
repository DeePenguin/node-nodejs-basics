import { availableParallelism } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'worker.js');
const workersAmount = availableParallelism();
const startNumber = 10;

const createWorker = (path, data) =>
  new Promise((resolve) => {
    const worker = new Worker(path, { workerData: data });
    worker.on('message', (data) => {
      resolve({ status: 'resolved', data });
    });
    worker.on('error', () => {
      resolve({ status: 'error', data: null });
    });
  });

const performCalculations = async () => {
  const workersPool = Array.from({ length: workersAmount }, (_, index) =>
    createWorker(pathToFile, index + startNumber)
  );

  const workersResults = await Promise.all(workersPool);

  console.log(workersResults);
};

await performCalculations();
