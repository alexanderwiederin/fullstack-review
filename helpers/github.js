const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (error, response, body) => {
    if(error) {
      callback(error, null, null);
    } else {
      callback(null, response, body);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;