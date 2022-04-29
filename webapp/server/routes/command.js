const router = require('express').Router();
const Command = require('../models/Command');

//Create new command
router.post('/', async (req, res) => {
  const newCommand = new Command(req.body);
  try {
    const savedCommand = await newCommand.save();
    res
      .status(200)
      .json({ message: 'New command added successfully', savedCommand });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not add new command', error: error });
  }
});

//get all commands
router.get('/', async (req, res) => {
  try {
    let commands = await Command.find().sort({ createdAt: -1 }).limit(1);
    res.status(200).json(commands);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch all commands', error });
  }
});

//get a command based on ID
router.get('/find/:id', async (req, res) => {
  try {
    const command = await Command.findById(req.params.id);
    res.status(200).json(command);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete command
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (error) {
    res.status(500).json(error);
  }
});

//update command status
router.put('/:id', async (req, res) => {
  try {
    const updatedCommand = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCommand);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
