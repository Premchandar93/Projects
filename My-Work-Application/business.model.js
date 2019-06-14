const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Task = new Schema({
  task_id: {
    type: String
  },
  task_name: {
    type: String
  },
  work_data: {
  	type: Array
  }
},{
    collection: 'task'
});

module.exports = mongoose.model('Task', Task);