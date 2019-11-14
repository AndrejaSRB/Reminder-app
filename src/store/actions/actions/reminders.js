import * as actionTypes from "../actionTypes/reminders";

export const getRemindersList = payload => {
    return {
      type: actionTypes.GET_REMINDERS_LIST_START,
      payload
    };
};

export const saveRemindersList = payload => {
    return {
      type: actionTypes.GET_REMINDERS_LIST_SUCCESS,
      payload
    };
};

export const postReminder = payload => {
  return {
    type: actionTypes.POST_REMINDER,
    payload
  };
};

export const deleteReminder = payload => {
  return {
    type: actionTypes.DELETE_REMINDER,
    payload
  };
};

export const userLoggedIn = payload => {
  return {
    type: actionTypes.USER_LOGGED_IN,
    payload
  };
};

export const userLoggedOut = () => {
  return {
    type: actionTypes.USER_LOGGED_OUT,
  };
};

export const saveUserProfilePicture = payload => {
  return {
    type: actionTypes.SAVE_USER_PROFILE_PICTURE,
    payload
  };
};

export const saveUserProfileInformation = payload => {
  return {
    type: actionTypes.SAVE_USER_INFORMATION,
    payload
  };
};

export const editReminder = payload => {
  return {
    type: actionTypes.EDIT_REMINDER,
    payload
  };
};

export const renderFilterRoute = () => {
  return {
    type: actionTypes.RENDER_FILTER_ROUTE,
  };
};

export const deleteFilterRoute = () => {
  return {
    type: actionTypes.DELETE_FILTER_ROUTE,
  };
};