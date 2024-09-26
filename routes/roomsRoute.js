const express = require('express');

const router = express.Router();
const Room = require('../models/room');
const Router = require('router');

router.get("/getallrooms", async (req, res) => {
  try {
    //try catch is used to avoid errors in async await
    const rooms = await Room.find({});
    // find is a mongodb function used to search for anything in rooms model
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    
    const room = await Room.findOne({ _id : roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});



module.exports = router;



