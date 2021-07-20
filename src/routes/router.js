const { Router } = require('express');

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const routes = Router();

routes.post('/user', userController.create);
routes.get('/users', userController.read);
routes.post('/update/:user_id', userController.update);
routes.delete('/user/:user_id', userController.delete);

routes.get('/user/:user_id', userController.findUser);

routes.post('/session', sessionController.create)

module.exports = routes