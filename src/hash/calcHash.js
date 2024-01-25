import { createHash } from 'node:crypto';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const hashTs = new Transform({
  transform(chunk, _, callback) {
    const hash = createHash('sha256').update(chunk).digest('hex');
    this.push(hash.concat('\n'));
    callback();
  },
});

const calculateHash = async () => {
  const rs = createReadStream(pathToFile);
  await pipeline(rs, hashTs, stdout);
};

await calculateHash();
