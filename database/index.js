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
      console.log('error on retreive');
      callback(error, null);
    } else {
      var sortedRepos = repos.sort((a, b) => {
        console.log('a', a.forks, 'b', b.forks);
      return b.forks - a.forks;
      });
      callback(null, sortedRepos.slice(0, 26))
    }
  });
}

module.exports.save = save;
module.exports.retrieve = retrieve;