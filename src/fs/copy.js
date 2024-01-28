import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { doesExist } from '../utils/doesExist.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, 'files');
const destinationPath = join(__dirname, 'files-copy');
const errorMessage = 'FS operation failed';

const copyDir = async (source, destination) => {
  if (!(await doesExist(source))) {
    throw new Error();
  }
  await mkdir(destination);

  const sourceContent = await readdir(source, { withFileTypes: true });
  sourceContent.forEach(async (item) => {
    if (item.isDirectory()) {
      return await copyDir(
        join(source, item.name),
        join(destination, item.name)
      );
    }
    await copyFile(join(source, item.name), join(destination, item.name));
  });
};

const copy = async () => {
  try {
    await copyDir(sourcePath, destinationPath);
  } catch (error) {
    throw new Error(errorMessage);
  }
};

await copy();
