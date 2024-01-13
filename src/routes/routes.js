// Not needed for this project, but useful for larger projects

const checksumController = require('../controllers/checksumController');

const routes = app => {
  // @route    POST checksum
  // @desc     Calculate checksum
  // @access   Private
  app.post('/v1/checksum', checksumController.calculate);
};

module.exports = routes;