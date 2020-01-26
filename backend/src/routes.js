const { Router } = require('express');

const DeveloperController = require('./controllers/DeveloperController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/developers', DeveloperController.index);
routes.post('/developers', DeveloperController.store);
routes.delete('/developers/:githubUsername', DeveloperController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
