import { createWriteStream } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToWrite.txt');

const exit = (rl) => {
  rl.close();
  stdout.write('\nSaved. Have a good day!\n');
  process.exit();
};

const write = async () => {
  const writeStream = createWriteStream(pathToFile, 'utf8');
  const rl = createInterface({ input: stdin, output: writeStream });

  stdout.write(
    'Type something to save it into file. Type "exit" to finish. \n'
  );

  rl.on('line', (data) => {
    if (data.toString().trim().toLowerCase() === 'exit') {
      exit(rl);
    }
    rl.output.write(`${data}\n`);
  });

  process.on('SIGINT', () => {
    exit(rl);
  });
};

await write();
