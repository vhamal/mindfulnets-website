var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MEDITATIONS_FILE = path.join(__dirname, 'meditations.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/meditations', function(req, res) {
  fs.readFile(MEDITATIONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/meditations', function(req, res) {
  fs.readFile(MEDITATIONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var meditations = JSON.parse(data);
    // TODO rely on database to ensure unique id instead of Date.now()
    var newMeditation = {
      id: Date.now(),
      creator: req.body.creator,
      startTimestamp: req.body.startTimestamp
    };
    meditations.push(newMeditation);
    fs.writeFile(MEDITATIONS_FILE, JSON.stringify(meditations, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(meditations);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
