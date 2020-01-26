const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema');

const DeveloperSchema = new mongoose.Schema({
  name: String,
  githubUsername: String,
  bio: String,
  avatarUrl: String,
  technologies: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

module.exports = mongoose.model('Developer', DeveloperSchema);
