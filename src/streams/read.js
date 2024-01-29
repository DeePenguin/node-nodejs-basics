import { createReadStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';
import { CustomError } from '../utils/error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToRead.txt');
const errorMessage = 'Can\'t read the file';

const read = async () => {
  try {
    const stream = createReadStream(pathToFile);
    await pipeline(stream, stdout);
  } catch (error) {
    throw new CustomError(errorMessage, error);
  }
};

await read();
