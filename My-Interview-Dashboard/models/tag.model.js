const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let interview_tag = new Schema({
    tag_name: {
        type: String
    },
    questions: {
        type: Array
    },
    questions_count: {
        type: Integer
    },
});
module.exports = mongoose.model('InterviewTag', interview_tag);
