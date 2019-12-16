import { combineReducers } from 'redux'
import userRedirect from './ToggleUserRedirectReducer'
import alertBox from './AlertBoxReducer'
import interviewData from './InterviewDataReducer';
import feedbackData from './FeedbackDataReducer';

export default combineReducers({
  userRedirect,
  alertBox,
  feedbackData,
  interviewData
})