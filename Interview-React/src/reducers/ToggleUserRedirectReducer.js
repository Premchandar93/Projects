import { USER_REDIRECT, REMOVE_USER } from '../actions/actionsTypes'

const USER_SIGNED_IN = {
	status : false,
};

const toggleUserRedirect = (state=USER_SIGNED_IN, action) => {
    switch (action.type){
        case USER_REDIRECT:
            return {
            	username : action.username,
            	status : true,
            };
        case REMOVE_USER: {
            return {
                username : '',
                status : false,
            };
        }
        default:
            return state;
    }
}

export default toggleUserRedirect