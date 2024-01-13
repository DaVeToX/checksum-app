// Not needed for this project at the moment.
// But needed if we want to store data in a database.

const { Schema, model } = require('mongoose');

const checkSumSchema = new Schema({
  listA: {
    type: Array,
    required: true
  },
  listB: {
    type: Array,
    required: true
  },
  result: {
    type: Boolean,
    default: false
  }
});

const CheckSumSchema = model('CheckSumSchema', checkSumSchema);
module.exports = CheckSumSchema;