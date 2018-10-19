const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  gitId: Number,
  ownerLogin: String,
  name: String,
  forks: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (gitId, name, ownerLogin, forks, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repo = new Repo({gitId, name, ownerLogin, forks});
  repo.save((error, product) => {
    if(error) {
      callback(error, null);
    } else {
      callback(null, product);
    }
  });
}

module.exports.save = save;