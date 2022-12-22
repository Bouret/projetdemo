import migration from 'mysql-migrations';
import { URL } from 'url';
import env from '../config/env.js';
import getPool from '../config/database.js';

const run = async () => {
  await env();
  const dirname = new URL('.', import.meta.url).pathname;
  migration.init(getPool(), `${dirname}../migrations`);
};

run()
  .then(() => {
    console.log('Migrations loading done');
  })
  .catch((error) => {
    console.log('Failed loading migrations');
    console.log(error);
  });
