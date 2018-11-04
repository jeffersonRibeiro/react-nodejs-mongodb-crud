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
    mongoURI: 'mongodb://jeff:a34843394@ds225010.mlab.com:25010/teste-fullstack',  /*Create a MongoDB on mlab.com and paste the URI here*/
  },
  auth: {
    secretOrKey: 'chaordic',
    expiresIn: '1h',
  },
}
