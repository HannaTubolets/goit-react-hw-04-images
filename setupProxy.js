const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/?q=${inputValue}&page=${pageNr}&key=${API_KEY}, {}', {
      target: 'https://pixabay.com/api',
      secure: false,
      changeOrigin: true,
    })
  );
};
