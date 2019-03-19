var user = require('../models/user');
var userInstance = require('../models/userInstance');

const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        user_count: function(callback) {
            //pass an empty obj as match condition to find docs of this collection
            user.countDocuments({}, callback);
        },
        user_instance_count: function(callback) {
            userInstance.countDocuments({}, callback);
        },
        user_instance_online_count: function(callback) {
            userInstance.countDocuments({}, callback);
        } },
        function(err, results) {
            res.render('index', {title: 'UserBase Home.', error: err, data: results});
    });
};

//disp all users.
exports.user_list = function(req, res, next) {

    user.find({}, 'userName')
      .populate('user')
      .exec(function (err, list_users) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('user_list', { title: 'User List', user_list: list_users });
      });
      
  };

//disp user profile 
exports.user_detail = function(req, res, next) {

    async.parallel({
        user: function(callback) {

            user.findById(req.params.id)
              .populate('userName')
              .populate('userID')
              .exec(callback);
        },
        user_instance: function(callback) {

          userInstance.find({ 'user': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book==null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('user_detail', { title: 'Title', user: results.user, user_instances: results.user_instance } );
    });

};
   

//disp user registration form on GET
exports.user_new_get = function(req, res, next) {
    async.parallel({
        users: function(callback) {
            user.find(callback);
        },
    }, function(err, results) {
            if(err) {return next(err);}
            res.render('user_form', {title: 'Create User', users: results.users});
    });
};

//process registration on POST
exports.user_new_post = [
    // Validate fields.
    body('userName', 'username must not be empty.').isLength({ min: 1 }).trim(),
  
    // Sanitize fields (using wildcard).
    sanitizeBody('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var use = new user(
          { userName: req.body.userName,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                users: function(callback) {
                    user.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('user_form', { title: 'Create user', users:results.users, user: user, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            user.save(function (err) {
                if (err) { return next(err); }
                   //successful - redirect to new book record.
                   res.redirect(user.url);
                });
        }
    }
];

//disp user delete on GET
exports.user_delete_get = function(req, res) {
    res.send('In Progress: user delete GET');
};

//hadle user delete POST
exports.user_delete_post = function(req, res) {
    res.send('In Progress: user delete POST');
};

//disp author update form on POST
exports.user_update_get = function(req, res) {
    res.send('In Progress: user update GET');
};

//disp user update on POST
exports.user_update_post = function(req, res) {
    res.send('In Progress: user update POST');
};