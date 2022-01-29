module.exports = ({ env }) => ({
  // ...
  sentry: {
    dsn: env(
      "https://86552032b4174f4aba42db8c7ac8de36@o1126629.ingest.sentry.io/6169024"
    ),
  },
  // ...
});
