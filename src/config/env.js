export default async () => {
  if (process.env.APP_ENV !== 'prod') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const dotenv = await import('dotenv');
    dotenv.config();
  }
};
