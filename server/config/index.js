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
    mongoURI: '', /* entre em contato jefferson.ribeiro.contato@gmail.com para ter a URI do banco */    
  },
  auth: {
    secretOrKey: 'chaordic',
  },
}