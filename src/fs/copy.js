import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
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
      await copyFile(
        join(sourcePath, item.name),
        join(destinationPath, item.name)
      );
    });
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await copy();
