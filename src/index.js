import Hapi from '@hapi/hapi';
import H2o2 from '@hapi/h2o2';
import qs from 'qs';
import AuthBearer from 'hapi-auth-bearer-token';

import routes from './routes/index.js';
import env from './config/env.js';

const init = async () => {
    await env();

    const server = Hapi.server({
        port: process.env.PORT || process.env.APP_PORT || 80,
        host: process.env.APP_HOST || '0.0.0.0',
        query: {
            parser: (query) => qs.parse(query),
        },
        routes: {
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.APP_ENV !== 'dev') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        console.error('ValidationError:', err.message);
                        const error = err;
                        error.message = `Invalid request payload input`;
                        throw error;
                    } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    }
                },
            },
        },
    });
    await server.register(H2o2);

    if (process.env.APP_ENV !== 'dev') {
        await server.register(AuthBearer);

        server.auth.strategy('simple', 'bearer-access-token', {
            allowQueryToken: true,
            validate: async (request, token) => {
                const isValid = token === process.env.ACCESS_TOKEN;
                const credentials = {
                    token
                };

                return {
                    isValid,
                    credentials
                };
            },
        });

        server.auth.default('simple');
    }

    routes.forEach((route) => server.route(route));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();