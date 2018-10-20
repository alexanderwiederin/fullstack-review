const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  Repo.insertMany(repos, (error, docs) => {
    if(error) {
      callback(error, null);
    } else {
      callback(null, docs)
    }
  });
}


let retrieve = (callback) => {
  Repo.find((error, repos) => {
    if(error) {
      callback(error, null);
    } else {
      var sortedRepos = repos.sort((a, b) => {
      return b.forks - a.forks;
      });
      callback(null, sortedRepos.slice(0, 25))
    }
  });
}

module.exports.save = save;
module.exports.retrieve = retrieve;