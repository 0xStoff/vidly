module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9bc28fd8ffe1d3bf41ca7fb2c54af916'),
  },
});
