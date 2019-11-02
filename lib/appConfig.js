module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email'],
    proxy: true
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
