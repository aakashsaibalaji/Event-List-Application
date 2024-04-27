const express = require('express');
const { createEvent,updatingEvent, deletingEvent, getAllEvents } = require('../controllers/Eventcontroller');
const { Requiresign } = require('../middleware/Authmiddleware');
const router = express.Router()

router.post('/createEvent',Requiresign,createEvent);

router.put('/updateEvent/:id',Requiresign,updatingEvent);

router.delete('/deleteEvent/:id',Requiresign,deletingEvent);

router.get('/allEvents',getAllEvents);

module.exports=router;