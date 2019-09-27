import * as actionTypes from "../../actions/actionTypes/lists";
import { switchMap, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { getList, saveList } from "../../actions/actions/lists";

export const params = (url, method, action) => ({
  url: url,
  method: method,
  body: JSON.stringify(action)
});

export const getListsEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.GET_LISTS_START),
    switchMap(action =>
      ajax(
        `https://reminder-app-548d7.firebaseio.com/${action.payload}/lists.json`
      ).pipe(mergeMap(data => [saveList(data.response)]))
    )
  );
};

export const addListEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.ADD_LIST),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${action.payload.userId}/lists.json`,
          "POST",
          action.payload.body
        )
      ).pipe(mergeMap(() => [getList(action.payload.userId)]))
    )
  );
};

export const deleteListEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.DELETE_LIST),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${action.payload.userId}/lists/${action.payload.listId}.json`,
          "DELETE"
        )
      ).pipe(mergeMap(() => [getList(action.payload.userId)]))
    )
  );
};

export const editListEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.EDIT_LIST),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${action.payload.userId}/lists/${action.payload.listId}.json`,
          "PATCH",
          action.payload.body
        )
      ).pipe(mergeMap(() => [getList(action.payload.userId)]))
    )
  );
};

export const updateListEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.UPDATE_LIST),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${action.payload.userId}/lists.json`,
          "PUT",
          action.payload.body
        )
      ).pipe(mergeMap(() => [getList(action.payload.userId)]))
    )
  );
};
