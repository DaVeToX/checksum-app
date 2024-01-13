// Not needed for this project at the moment.
// But needed if we want to store data in a database.

const Checksum = require('../models/CheckSumSchema');

const calculate = async (req, res, next) => {
  const checksumProps = req.body;
  try {
    const cs = await Checksum.create(checksumProps);
    res.status(201).send(toDo);
  } catch (e) {
    next();
  }
};

const checksumController = {
  calculate
};

module.exports = checksumController;
