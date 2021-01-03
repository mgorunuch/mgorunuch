const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const https = require('https');

const app = express();

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//обслуживание html
app.get('/*', function (req, res) {
  res.redirect('https://' + req.headers.host + req.url);

  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
