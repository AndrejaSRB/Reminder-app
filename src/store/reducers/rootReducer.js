import * as actionTypes from "../actions/actionTypes/reminders";

const initialState = {
  isAuth: false,
  user: null,
  profilePictureURL: ""
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGGED_IN:
      return {
        ...state,
        isAuth: true,
      };
    case actionTypes.SAVE_USER_INFORMATION:
      return {
        ...state,
        user: action.payload
      };
    case actionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
        profilePictureURL: ""
      };
    case actionTypes.SAVE_USER_PROFILE_PICTURE:
      return {
        ...state,
        profilePictureURL: action.payload
      };
    default:
      return state;
  }
};

export default remindersReducer;
