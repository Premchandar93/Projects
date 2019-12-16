import { FEEDBACK_DATA } from '../actions/actionsTypes'

const DEFAULT_FEEDBACK_DATA = {
    feedbackList : [],
};

const feedbackData = (state=DEFAULT_FEEDBACK_DATA, action) => {
    switch (action.type){
        case FEEDBACK_DATA:
            return {
                feedbackList: action.payload,
                company_name : action.name
            };
        default:
            return state;
    }
}

export default feedbackData