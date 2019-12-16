import { INTERVIEW_DATA, REMOVE_USER, FEEDBACK_DATA, SHOW_SUCCESS_ALERT, SHOW_DANGER_ALERT, SHOW_WARNING_ALERT, HIDE_ALERT, ADD_TODO, USER_REDIRECT, REMOVE_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER} from './actionsTypes'
import axios from 'axios'

let TodoId = 2

export const addTodo = text => ({
    type: ADD_TODO,
    id: TodoId++,
    text
})

export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    id: id
})

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const toggleUserSignedIn = (username) => ({
  type : (username ? USER_REDIRECT : REMOVE_USER),
  username : username
})

export const ShowSuccessAlert = (heading, message) => ({
  type : SHOW_SUCCESS_ALERT,
  data : {
    heading : heading,
    message : message,
  }
})

export const ShowDangerAlert = (heading, message) => ({
  type : SHOW_DANGER_ALERT,
  data : {
    heading : heading,
    message : message
  }
})

export const ShowWarningAlert = function(heading,message) {
  return{
    type : SHOW_WARNING_ALERT,
    data : {
      heading : heading,
      message : message
    }
  }
};
export const HideAlert = (param) => ({
  type : HIDE_ALERT,
  data : {
    payload : param
  }
})

export const UpdateInterviewData = (data, ) => ({
  type : INTERVIEW_DATA,
  payload : data,
})

export const UpdateFeedbackData = (data, name) => ({
  type : FEEDBACK_DATA,
  payload : data,
  name : name

})

export const PostInterviewAPI = (param) => {
  return dispatch => {
    dispatch( ShowWarningAlert(param.alert.warning.heading, param.alert.warning.message));
    axios
    .post(param.url, param.payload )
    .then(res => {
      dispatch(ShowSuccessAlert(param.alert.post_success.heading, param.alert.post_success.message));


    })
    .catch(err => {
      dispatch(ShowDangerAlert(param.alert.post_danger.heading, param.alert.post_danger.message));
    });
  };
};

export const DeleteInterviewAPI = (param) => {
  return dispatch => {
    dispatch( ShowWarningAlert(param.alert.warning.heading, param.alert.warning.message));
    axios
    .delete(param.url)
    .then(res => {
      dispatch(ShowSuccessAlert(param.alert.delete_success.heading, param.alert.delete_success.message));


    })
    .catch(err => {
      dispatch(ShowDangerAlert(param.alert.delete_danger.heading, param.alert.delete_danger.message));
    });
  };
};

export const PostFeedbackAPI = (param) => {
  return dispatch => {
    dispatch( ShowWarningAlert(param.alert.warning.heading, param.alert.warning.message));
    axios
    .post(param.url, param.payload )
    .then(res => {
      dispatch(ShowSuccessAlert(param.alert.post_success.heading, param.alert.post_success.message));


    })
    .catch(err => {
      dispatch(ShowDangerAlert(param.alert.post_danger.heading, param.alert.post_danger.message));
    });
  };
};

export const GetInterviewAPI = (param) => {
  return dispatch => {
    dispatch( ShowWarningAlert(param.alert.warning.heading, param.alert.warning.message));

    axios
    .get(param.url)
    .then(res => {


      dispatch(ShowSuccessAlert(param.alert.get_success.heading, param.alert.get_success.message));
      dispatch(UpdateInterviewData(res.data));

    })
    .catch(err => {
      dispatch(ShowDangerAlert(param.alert.get_danger.heading, param.alert.get_danger.message));
    });
  };
};

export const GetFeedbackAPI = (param) => {
  return dispatch => {
    dispatch( ShowWarningAlert(param.alert.warning.heading, param.alert.warning.message));

    axios
    .get(param.url)
    .then(res => {
      dispatch(ShowSuccessAlert(param.alert.get_success.heading, param.alert.get_success.message));
      
      var data = (res.data.interview_feedback.length !== 0 ? res.data.interview_feedback : []);
      dispatch(UpdateFeedbackData(data, res.data.interview_company_name));

    })
    .catch(err => {
      dispatch(ShowDangerAlert(param.alert.get_danger.heading, param.alert.get_danger.message));
    });
  };
};
