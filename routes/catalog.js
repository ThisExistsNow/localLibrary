var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');
var instance_controller = require('../controllers/userInstanceController');

//USER ROUTES

//GET  home page
router.get('/', user_controller.index);

//GET for new user.. (must come before routes that display user)
router.get('/user/new', user_controller.user_new_get);

//POST for new user
router.post('/user/new', user_controller.user_new_post);

//GET for delete user
router.get('/user/:id/delete', user_controller.user_delete_get);

//POST for delete user
router.get('/user/:id/delete', user_controller.user_delete_post);

//Get to update user
router.get('/user/:id/update', user_controller.user_update_get);

//POST to update user
router.get('/user/:id/update', user_controller.user_update_post);

//GET for one user
router.get('/user/:id', user_controller.user_detail);

//GET for list of users
router.get('/users', user_controller.user_list);

//USER INSTANCE ROUTES

//display all userinstances
router.get('/profiles', instance_controller.userInstance_list);

//disp detail page for indv userInstance
router.get('/user/:id/profile', instance_controller.userInstance_detail);

//userInstance new create on GET
router.get('/user/:id/new_get', instance_controller.userInstance_new_get);

//userInstance create on POST
router.get('/user/:id/new_post', instance_controller.userInstance_new_post);

//userInstance delete on GET
router.get('/user/:id/delete_get', instance_controller.userInstance_delete_get);

//userInstance delete on POST
router.get('/user/:id/delete_post', instance_controller.userInstance_delete_post);

//userInstance update on GET
router.get('user/:id/update_get', instance_controller.userInstance_update_get);

//userInstance update on POST
router.get('user/:id/update_post', instance_controller.userInstance_update_post);

module.exports = router;