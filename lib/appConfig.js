module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email'],
    proxy: true
  },
  logdna: {
    key: process.env.LOGDNA_INGESTION_KEY,
    app: 'polls',
    env: process.env.NODE_ENV || 'development'
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  },
  db: {
    mongoURI: process.env.MONGO_URI,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};
