const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('./fetchuser');
const Data = require('../models/data'); 

// ROUTE 1: Create a new Data using: POST "/api/notes/createnotes".
router.post('/createnotes', fetchuser, [
  body('title', 'Title is required').isLength({ min: 1 }),
  body('description', 'Description is required').isLength({ min: 1 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = new Data({
      title,
      description,
      tag,
      user: req.user.id
    });

    const savedData = await data.save();
    res.json(savedData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Fetch all Datas using: GET "/api/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
  try {
    const datas = await Data.find({ user: req.user.id });
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Update an existing Data using: PUT "/api/Datas/updateData/:id". Login required
router.put('/updateData/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a newData object
    const newData = {};
    if (title) { newData.title = title; }
    if (description) { newData.description = description; }
    if (tag) { newData.tag = tag; }

    // Find the Data to be updated and update it
    let data = await Data.findById(req.params.id);
    if (!data) { return res.status(404).send("Not Found"); }

    // Allow update only if user owns this Data
    if (data.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    data = await Data.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true });
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


// ROUTE 4: Delete an existing Data using: DELETE "/api/Datas/deleteData/:id". Login required
router.delete('/deleteData/:id', fetchuser, async (req, res) => {
  try {
    // Find the Data to be delete and delete it
    let data = await Data.findById(req.params.id);
    if (!data) { return res.status(404).send("Not Found"); }

    // Allow deletion only if user owns this Data
    if (data.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    data = await Data.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Data has been deleted", data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
