import { access, constants } from 'node:fs/promises';

export async function doesExist(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}
