import { createReadStream, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToCompress.txt');
const pathToArchive = join(__dirname, 'files', 'archive.gz');
const errorMessage = 'Something went wrong';

const compress = async () => {
  try {
    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(pathToArchive);
    await pipeline(rs, createGzip(), ws);
  } catch (err) {
    throw new Error(errorMessage);
  }
};

await compress();
