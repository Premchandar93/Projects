const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let interview = new Schema({
    interview_company_name: {
        type: String
    },
    interview_role: {
        type: String
    },
    interview_company_location: {
        type: String
    },
    interview_status: {
        type: String
    },
    interview_date: {
        type: String
    },
    interview_feedback: {
        type: Array
    }
});
module.exports = mongoose.model('Interview', interview);
