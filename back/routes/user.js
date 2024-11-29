const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware.isAdminMiddleware, userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;