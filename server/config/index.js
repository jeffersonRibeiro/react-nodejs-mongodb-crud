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
    mongoURI: '',    
  },
  auth: {
    secretOrKey: 'chaordic',
  },
}
