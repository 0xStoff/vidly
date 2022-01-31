module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '40e0737d3e7d8cdbf2335749b1498924'),
  },
});
