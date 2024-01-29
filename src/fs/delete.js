import { rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CustomError } from '../utils/error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt');
const errorMessage = 'FS operation failed';

const remove = async () => {
  try {
    await rm(fileToRemove);
  } catch (error) {
    throw new CustomError(errorMessage, error);
  }
};

await remove();
