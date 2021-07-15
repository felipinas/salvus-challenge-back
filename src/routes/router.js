const { Router } = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const routes = Router();

routes.post('/user', userController.create);
routes.get('/users', userController.read)
routes.delete('/user/:user_id', userController.delete);

routes.post('/session', sessionController.create)

module.exports = routes