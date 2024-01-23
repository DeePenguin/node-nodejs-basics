import { createReadStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToRead.txt');
const errorMessage = 'FS operation failed';

const read = async () => {
  try {
    const stream = createReadStream(pathToFile);
    await pipeline(stream, stdout);
  } catch (err) {
    throw new Error(errorMessage);
  }
};

await read();
