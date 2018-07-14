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
            return res.status(500).send()
        }

        if (!user) {
            return res.status(404).send()
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password:', isMatch);
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
router.get('/user/events/:id', function(req, res, next) {
    User.findById(req.params.id).populate('events').exec((err, user) => {

        if (err) return next(err);
        if (user.events) {
            res.json(user.events);
        } else {
            res.json(null);
        }

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
        newEvent.start = req.body.start;
        newEvent.end = req.body.end;
        newEvent.allDay= req.body.allDay;
        newEvent.user.push(u);

        Event.create(newEvent).then(p1 => {
            u.events.push(p1);
            u.save().then(n => {
                res.status(200).json(newEvent);
            })
        }).catch(e => {
            res.status(400).send('Erro:' + e);
        })
    });
});



router.put('/event/update/:id', function(req, res) {
    Event.findOneAndUpdate(req.params.id,
        {
            title:req.body.title,
            start : req.body.start,
            end : req.body.end,
            allDay: req.body.allDay      
        },  
        function(err, response){
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).send('Event updated!');

                }
     
        
    });
});
// Return router
module.exports = router;