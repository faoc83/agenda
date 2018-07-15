// Dependencies
var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Event = require('../models/Event.js');


// Models
router.post('/user/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.log("Login Error "+err)
            return res.status(500).send("Login Error!")
        }

        if (!user) {
            return res.status(404).send("Login Error! User not found.")
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
           
        });


        return res.status(200).send(user);
    });
});

router.get('/user', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/**
 * remove evento e atualiza lista de eventos do utilizador
 */
router.delete('/event/delete/:id', function(req, res) {

    Event.findById(req.params.id, (err, ev) => {
        if (err) return res.status(500).send(err);
        ev.remove().then(() => {      
            return res.status(200).send("Event successfully deleted");
        }).catch((e) => {
            return res.status(500).send("Error deleting Event");
        })

    });



})

/* GET ALL User Events */
router.get('/events/user/:id', function(req, res, next) {
    Event.find({ createdBy: req.params.id}).exec((err, events) => {
        if (err) return next(err);
            res.json(events);
      

    })
});


/* GET ALL User Friends */
router.get('/user/friends/:id', function(req, res, next) {
    User.find({_id:{$ne:req.params.id}},'_id name username').exec((err, user) => {
        if (err) return res.status(500).json(err);
         res.status(200).json(user);
     
    })
});

/**
 * Create new event
 */
router.post('/event/create', function(req, res) {

    User.findOne({ _id: req.body.userId }, function(err, u) {
        if (err) {
            console.log(err)
        }
        var newEvent = new Event();
        newEvent.title = req.body.title;
        newEvent.description=req.body.description;
        newEvent.start = req.body.start;
        newEvent.end = req.body.end;
        newEvent.allDay= req.body.allDay;       
       newEvent.createdBy=u;
       newEvent.user=req.body.users;
        Event.create(newEvent).then(p1 => {
    
            u.save().then(n => {
                res.status(200).json(newEvent);
            })
        }).catch(e => {
            res.status(400).send('Erro:' + e);
        })
    });
});



router.put('/event/update/:id', function(req, res) {

    Event.findOneAndUpdate({_id:req.params.id},
        {
            title:req.body.title,
            description:req.body.description,
            start : req.body.start,
            end : req.body.end,
            allDay: req.body.allDay,
            user:req.body.users   
        },  
        function(err, response){
            console.log(err + "----"+ JSON.stringify(response))
                if (err) {
                   
                    res.status(400).send(err);
                } else {
                    res.status(200).send('Event updated!');

                }
     
        
    });
});
// Return router
module.exports = router;