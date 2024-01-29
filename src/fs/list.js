import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CustomError } from '../utils/error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dirPath = join(__dirname, 'files');
const errorMessage = 'FS operation failed';

const list = async () => {
  try {
    const directoryContent = await readdir(dirPath);
    console.log(directoryContent);
  } catch (error) {
    throw new CustomError(errorMessage, error);
  }
};

await list();
