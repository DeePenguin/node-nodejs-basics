import { argv } from 'node:process';

const parseArgs = () => {
  const args = argv.slice(2);

  const reducedArgs = args.reduce((acc, arg, index) => {
    if (arg.startsWith('--')) {
      const [key, value] = [arg.replace('--', ''), args[index + 1]];
      acc.push(`${key} is ${value}`);
    }
    return acc;
  }, []);

  console.log(reducedArgs.join(', '));
};

parseArgs();
