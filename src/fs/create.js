import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CustomError } from '../utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToFile = join(__dirname, 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';
const errorMessage = 'FS operation failed';

const create = async () => {
  try {
    await writeFile(pathToFile, fileContent, { flag: 'wx' });
  } catch (error) {
    throw new CustomError(errorMessage, error);
  }
};

await create();
