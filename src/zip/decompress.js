import { createReadStream, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToCompress.txt');
const pathToArchive = join(__dirname, 'files', 'archive.gz');
const errorMessage = 'Something went wrong';

const decompress = async () => {
  try {
    const rs = createReadStream(pathToArchive);
    const ws = createWriteStream(pathToFile);
    await pipeline(rs, createGunzip(), ws);
  } catch (err) {
    throw new Error(errorMessage);
  }
};

await decompress();
