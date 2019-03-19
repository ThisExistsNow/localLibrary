#! /usr/bin/env node

console.log('This script populates some users and userinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://foppy:english551@firstnode-kw9xa.mongodb.net/userBase?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var user = require('./models/user')
var userInstance = require('./models/userinstance')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser:true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var userInstances = []

function userCreate(userName, userID, userDate, cb) {
  userdetail = {
    userName:userName,
    userID:userID
  }
  if (userDate != false) userdetail.userDate = userDate

  var newser = new user(userdetail);
  newser.save(function(err) {
    if(err) {
      console.log("Error creating new user " + newser)
      cb(err, null)
      return
    }
    console.log("New User " + newser);
    users.push(newser)
    cb(null, newser)
  } );
}

function userInstanceCreate(user, status, cb) {
  userinstancedetail = {
    user: user,
  }    
  if (status != false) userinstancedetail.status = status
    
  var newInstance = new userInstance(userinstancedetail);    
  newInstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING UserInstance: ' + userInstance);
      cb(err, null)
      return
    }
    console.log('New UserInstance: ' + userInstance);
    userInstances.push(userInstance)
    cb(null, user)
  }  );
}

function createUsers(cb) {
    async.series([
        function(callback) {
          userCreate('MorlinB', '2D1158G9048L7703V295', '2018-12-29', callback);
        },
        function(callback) {
          userCreate('Genzo', '2W3450P8495L5904G817', '2019-2-28', callback);
        },
        function(callback) {
          userCreate('LemonG', '3R4679T3047H8344N772', '2019-3-10', callback);
        },
        function(callback) {
          userCreate('Beemblie', '3R5501J6085T6229V731', '2019-3-12', callback);
        },
        function(callback) {
          userCreate('Left4Dead', '4Q6697U2433W7757F018', '2019-3-16', callback);
        },
        function(callback) {
          userCreate('Brendest', '3D5509Y7825E4960L111', '2019-3-16', callback);
        },
        function(callback) {
          userCreate('Mashter', '2W3119B6594R5304R001', '2019-3-10', callback);
        },
        ],
        // optional callback
        cb);
}

function createUserInstances(cb) {
    async.parallel([
        function(callback) {
          userInstanceCreate(users[0], 'Offline', callback);
        },
        function(callback) {
          userInstanceCreate(users[1], 'Offline', callback);
        },
        function(callback) {
          userInstanceCreate(users[2], 'Offline', callback);
        },
        function(callback) {
          userInstanceCreate(users[3], 'Online', callback);
        },
        function(callback) {
          userInstanceCreate(users[4], 'Online', callback);
        },
        function(callback) {
          userInstanceCreate(users[5], 'Unavailable', callback);
        },
        function(callback) {
          userInstanceCreate(users[6], 'Online', callback);
        },
        ],
        // Optional callback
        cb);
}

async.series([
    createUsers,
    createUserInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('USERInstances: '+ userInstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});