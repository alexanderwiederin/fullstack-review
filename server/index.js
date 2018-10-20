const express = require('express');
const github = require('../helpers/github.js');
const dbConnection = require('../database/index.js');
const parseBody = require('body-parser');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parseBody.text());

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body, (error, response, body) => {
    if(error) {
      res.status(404).end();
    } else {
      var repos = JSON.parse(body);
      dbConnection.save(repos, (error, product) => {
        if(error) {
          res.status(500).end();
        } else {
          res.status(201).send(product).end();
        }
      })
    }
  });

});


app.get('/repos', function (req, res) {
  console.log('received get');
  dbConnection.retrieve((error, repos) => {
    repos.forEach((repo) => {
    })
    res.send(repos);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

