import * as actionTypes from "../actionTypes/lists";

export const addList = payload => {
    return {
      type: actionTypes.ADD_LIST,
      payload
    };
};

export const getList = payload => {
  return {
    type: actionTypes.GET_LISTS_START,
    payload
  };
};

export const saveList = payload => {
  return {
    type: actionTypes.GET_LISTS_SUCCESS,
    payload
  };
};

export const deleteList = payload => {
  return {
    type: actionTypes.DELETE_LIST,
    payload
  };
};

export const editList = payload => {
  return {
    type: actionTypes.EDIT_LIST,
    payload
  };
};

export const updateList = payload => {
  return {
    type: actionTypes.UPDATE_LIST,
    payload
  };
};