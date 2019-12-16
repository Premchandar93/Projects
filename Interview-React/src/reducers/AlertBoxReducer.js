import { SHOW_SUCCESS_ALERT, SHOW_WARNING_ALERT, SHOW_DANGER_ALERT, HIDE_ALERT } from '../actions/actionsTypes'

const ALERT_DATA = {
	heading : null,
	message : null,
	status : false,
	variant : null,
};

const alertBox = (state=ALERT_DATA, action) => {
    switch (action.type){
        case SHOW_SUCCESS_ALERT:
            return {
            	...state,
            	variant : 'success',
            	heading : action.data.heading,
            	message : action.data.message,
            	status : false,
            };
        case SHOW_DANGER_ALERT:
        	return {
        		...state,
            	variant : 'danger',
            	heading : action.data.heading,
            	message : action.data.message,
            	status : true,
        	};
        case SHOW_WARNING_ALERT:
            return {
                ...state,
                variant : 'warning',
                heading : action.data.heading,
                message : action.data.message,
                status : true,
            };
        case HIDE_ALERT:
            return {
                variant : null,
                heading : null,
                message : null,
                status : false,
            };
        default:
            return state;
    }
}

export default alertBox