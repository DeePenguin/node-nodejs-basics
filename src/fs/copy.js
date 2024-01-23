import { mkdir, readdir } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { doesExist } from '../utils/doesExist.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, 'files');
const destinationPath = join(__dirname, 'files-copy');
const errorMessage = 'FS operation failed';

const copy = async () => {
  try {
    if (!(await doesExist(sourcePath))) {
      throw new Error();
    }
    await mkdir(destinationPath);

    const sourceContent = await readdir(sourcePath, { withFileTypes: true });
    sourceContent.forEach(async (item) => {
      await pipeline(
        createReadStream(join(sourcePath, item.name)),
        createWriteStream(join(destinationPath, item.name))
      );
    });
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await copy();
