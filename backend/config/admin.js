module.exports = ({ env }) => ({
  auth: {
<<<<<<< HEAD
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
=======
    secret: env('ADMIN_JWT_SECRET', env),
>>>>>>> origin/main
  },
});
