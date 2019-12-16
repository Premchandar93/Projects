import { INTERVIEW_DATA } from '../actions/actionsTypes'

const DEFAULT_INTERVIEW_DATA = {
    interviewList : [],
};

const interviewData = (state=DEFAULT_INTERVIEW_DATA, action) => {
    switch (action.type){
        case INTERVIEW_DATA:
            return {
                interviewList: action.payload
            };
        default:
            return state;
    }
}

export default interviewData