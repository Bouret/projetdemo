import env from '../config/env.js';
import getPool from '../config/database.js';
import videoFixtures from '../fixtures/videoFixtures.js';

const run = async () => {
    await env();
    const fixtures = {
        videos: videoFixtures,
    };

    const pool = getPool().promise();

    // eslint-disable-next-line no-restricted-syntax
    for (const [table, objects] of Object.entries(fixtures)) {
        try {
            console.log(`Loading ${table} fixtures..`);
            await pool.query(`TRUNCATE ${table}`); // eslint-disable-line no-await-in-loop
            // eslint-disable-next-line no-restricted-syntax
            for (const row of objects) {
                await pool.query(`INSERT INTO ${table} SET ?`, row); // eslint-disable-line no-await-in-loop
            }
        } catch (error) {
            console.log('error', error);
        }
    }
};

run()
    .then(() => {
        console.log('fixtures loading done');

        process.exit(0);
    })
    .catch((error) => {
        console.log('Failed loading fixtures');
        console.log(error);

        process.exit(0);
    });