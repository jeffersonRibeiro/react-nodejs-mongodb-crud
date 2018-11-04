module.exports = {
  server: {
    port: 8001,
    cors: {
      whiteListDomains: [
        '*',
      ],
    },
  },
  database: {
    mongoURI: '',  /*Create a MongoDB on mlab.com and paste the URI here*/
  },
  auth: {
    secretOrKey: 'chaordic',
    expiresIn: '1h',
  },
}
