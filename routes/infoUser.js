//File: routes/tvshows.js
module.exports = function(app) {

    var RInfoUser = require('../models/infoUser.js');
    var QRCode = require('qrcode')
  
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    }
     
    
    //GET - Return all tvshows in the DB
    findAllUsers = function(req, res) {
        RInfoUser.find(function(err, infoUser) {
            if(!err) {
          console.log('GET /infoUser')
                res.send(infoUser);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };
  
    //GET - Return a TVShow with specified ID
    findById = function(req, res) {
        RInfoUser.findById(req.params.id, function(err, infoUser) {
            if(!err) {
          console.log('GET /infoShow/' + req.params.id);
                res.send(infoUser);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };
  
    //POST - Insert a new TVShow in the DB
    addUser = function(req, res) {
        console.log('POST');
        console.log(req.body);
  
        var infoUserModel = new RInfoUser({
            title:    req.body.title,
            year: 	  req.body.year,
            country:  req.body.country,
            poster:   req.body.poster,
            seasons:  req.body.seasons,
            genre:    req.body.genre,
            summary:  req.body.summary  
        });
  
        infoUserModel.save(function(err) {
            if(!err) {
                console.log('Created');
            } else {
                console.log('ERROR: ' + err);
            }
        });
  
        
        var opts = {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          rendererOpts: {
            quality: 0.3
          }
        }
         
        QRCode.toDataURL('text', opts, function (err, url) {
          if (err) throw err
         
          var img = document.getElementById('image')
          img.src = url
          console.log(img.src);
          
        })
        res.send(infoUserModel);
  
        //AQUI SE CREA EL CODIGO QR
    };
  
    //PUT - Update a register already exists
    updateUser = function(req, res) {
        RInfoUser.findById(req.params.id, function(err, infoUser) {
            infoUser.title   = req.body.petId;
            infoUser.year    = req.body.year;
            infoUser.country = req.body.country;
            infoUser.poster  = req.body.poster;
            infoUser.seasons = req.body.seasons;
            infoUser.genre   = req.body.genre;
            infoUser.summary = req.body.summary;
  
            infoUser.save(function(err) {
                if(!err) {
                    console.log('Updated');
                } else {
                    console.log('ERROR: ' + err);
                }
                res.send(tvshow);
            });
        });
    }
  
    //DELETE - Delete a TVShow with specified ID
    deleteUser = function(req, res) {
        RInfoUser.findById(req.params.id, function(err, infoUser) {
            infoUser.remove(function(err) {
                if(!err) {
                    console.log('Removed');
                } else {
                    console.log('ERROR: ' + err);
                }
            })
        });
    }
  
    //Link routes and functions
    app.get('/infoUsers', findAllUsers);
    app.get('/infoUser/:id', findById);
    app.post('/infoUser', addUser);
    app.put('/infoUser/:id', updateUser);
    app.delete('/infoUser/:id', deleteUser);
  
  }