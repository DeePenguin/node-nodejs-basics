import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const cp = spawn('node', [pathToFile, ...args], { stdio: 'inherit' });
};

spawnChildProcess(['arg1', 'arg2', 3]);
