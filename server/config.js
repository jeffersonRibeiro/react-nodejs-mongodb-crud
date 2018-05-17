module.exports = {
  mongoURI: 'mongodb://jefferson:s19v20a21!@ds225010.mlab.com:25010/teste-fullstack',
  server: {
    port: 8001,
    cors: {
      whiteListDomains: [
        '*',
      ],
    },
  },
  auth: {
    secret: 'chaordic',
  },
}