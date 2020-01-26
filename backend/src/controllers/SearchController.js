const Developer = require('../models/Developer');

module.exports = {
  async index(request, response) {
    const {
      latitude,
      longitude,
    } = request.query;
    const technologies = request.query.technologies.split(',').map((str) => str.trim());
    const developers = await Developer.find({
      technologies: {
        $in: technologies,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    return response.json({ developers });
  },
};
