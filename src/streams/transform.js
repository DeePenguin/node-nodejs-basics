import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const exit = () => {
  stdout.write('Bye!\n');
  process.exit();
};

const reverseTs = new Transform({
  transform(chunk, _, callback) {
    const input = chunk.toString().trim();

    if (input.toLowerCase() === 'exit') {
      return exit();
    }

    const reversedInput = [...input].reverse().join('');
    this.push(reversedInput.concat('\n'));
    callback();
  },
});

process.on('SIGINT', () => {
  exit();
});

const transform = async () => {
  stdout.write('Type something. Type "exit" to finish. \n');
  await pipeline(stdin, reverseTs, stdout);
};

await transform();
