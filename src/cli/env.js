import { env } from 'node:process';

const parseEnv = () => {
  const rssKeys = Object.keys(env)
    .filter((key) => key.startsWith('RSS_'))
    .map((key) => `${key}=${env[key]}`);
  console.log(rssKeys.join('; '));
};

parseEnv();
