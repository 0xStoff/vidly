module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '62dd0379103472bc3ef8207e9dab57ef'),
  },
});
