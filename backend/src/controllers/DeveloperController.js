const axios = require('axios');
const Developer = require('../models/Developer');
const { findConnections, sendMessage } = require('../websocket');

const fetchDeveloperData = async (githubUsername) => axios.get(`https://api.github.com/users/${githubUsername}`);

module.exports = {
  async index(request, response) {
    const developers = await Developer.find();
    return response.json(developers);
  },

  async store(request, response) {
    const {
      githubUsername,
      technologies,
      latitude,
      longitude,
    } = request.body;

    let developer = await Developer.findOne({
      githubUsername,
    });

    if (!developer) {
      const apiResponse = await fetchDeveloperData(githubUsername);

      const {
        avatar_url: avatarUrl,
        bio,
        name,
      } = apiResponse.data;

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      developer = await Developer.create({
        name: name || githubUsername,
        githubUsername,
        bio,
        avatarUrl,
        technologies,
        location,
      });
    }
    const sendSocketMessageTo = findConnections(
      {
        latitude,
        longitude,
      },
      technologies,
    );
    sendMessage(sendSocketMessageTo, 'new-dev', developer);
    return response.json(developer);
  },

  async destroy(request, response) {
    const { githubUsername } = request.params;
    await Developer.deleteOne({
      githubUsername,
    }, (err) => {
      if (err) {
        console.log(err);
        response.status(500).json({
          error: `Could not delete user ${githubUsername}`,
        });
      }
    });
    return response.status(204).send();
  },

  async update(request, response) {
    const { githubUsername } = request.params;

    const {
      avatarUrl,
      bio,
      name,
      technologies,
      latitude,
      longitude,
    } = request.body;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const updatedDeveloper = await Developer.updateOne({
      githubUsername,
    }, {
      avatarUrl,
      bio,
      name,
      technologies,
      location,
    }, (err, raw) => {
      console.log(err);
      console.log(raw);
    });
    return response.json(updatedDeveloper);
  },
};
