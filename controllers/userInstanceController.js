var userInstance = require('../models/userInstance');

//disp all userInstances
exports.userInstance_list = function(req, res, next) {
    userInstance.find()
    .populate('userInstance')
    .exec(function (err, list_userInstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('userInstance_list', { title: 'User Instance List', userInstance_list: list_userInstances});
    });
};

//disp detail page for a specific UserInstance
exports.userInstance_detail = function(req, res) {
    res.send('In Progress: UserInstance detail: ' + req.params.id);
};

//disp UserInstance new form on GET
exports.userInstance_new_get = function(req, res) {
    res.send('In Progress: UserInstance new GET');
};

//handle UserInstance create on POST
exports.userInstance_new_post = function(req, res) {
    res.send('In Progress: UserInstance new POST');
};

//disp UserInstance delete on GET
exports.userInstance_delete_get = function(req, res) {
    res.send('In Progress: UserInstance delete GET');
};

//disp UserInstance delete on POST
exports.userInstance_delete_post = function(req, res) {
    res.send('In Progress: UserInstance delete POST');
};

//disp UserInstance update on GET
exports.userInstance_update_get = function(req, res) {
    res.send('In Progress: UserInstance update GET');
};

//disp UserInstance update on POST
exports.userInstance_update_post = function(req, res) {
    res.send('In Progress: UserInstance update POST');
};

