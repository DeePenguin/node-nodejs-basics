import { rename as fsRename } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { doesExist } from '../utils/doesExist.js';
import { CustomError } from '../utils/error.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wrongFilename = join(__dirname, 'files', 'wrongFilename.txt');
const properFilename = join(__dirname, 'files', 'properFilename.md');
const errorMessage = 'FS operation failed';

const rename = async () => {
  try {
    if (await doesExist(properFilename)) {
      throw new Error();
    }
    await fsRename(wrongFilename, properFilename);
  } catch (error) {
    throw new CustomError(errorMessage, error);
  }
};

await rename();
