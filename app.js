const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/notes.html'));
});

// static file support
app.use("/public", express.static('./public/'));


app.listen(port);
console.log('Server started at http://localhost:' + port);