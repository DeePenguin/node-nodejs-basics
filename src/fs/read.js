import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';
import { CustomError } from '../utils/error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToRead.txt');
const errorMessage = 'FS operation failed';

const read = async () => {
  try {
    const content = await readFile(pathToFile, { encoding: 'utf-8' });
    await pipeline(content.concat('\n'), stdout);
  } catch (error) {
    throw new CustomError(errorMessage, error);
  }
};

await read();
