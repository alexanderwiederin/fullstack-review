const express = require('express');
const github = require('../helpers/github.js');
const dbConnection = require('../database/index.js');
const parseBody = require('body-parser');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parseBody.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body, (error, response, body) => {
    if(error) {
      throw error;
    } else {
      JSON.parse(body).forEach((repo) => {
        dbConnection.save(repo.id, repo.name, repo.owner.login, repo.forks, (error, product) => {
          if(error) {
            console.log(error);
          } else {
            console.log('success: ', product)
          }
        });
      })
    }
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

