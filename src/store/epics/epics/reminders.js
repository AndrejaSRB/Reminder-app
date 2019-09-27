import * as actionTypes from "../../actions/actionTypes/reminders";
import { switchMap, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import {
  saveRemindersList,
  getRemindersList
} from "../../actions/actions/reminders";

export const params = (url, method, action) => ({
  url: url,
  method: method,
  body: JSON.stringify(action)
});

export const fetchReminderListEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.GET_REMINDERS_LIST_START),
    switchMap(action =>
      ajax(
        `https://reminder-app-548d7.firebaseio.com/${
          action.payload
        }/reminders.json`
      ).pipe(mergeMap(data => [saveRemindersList(data.response)]))
    )
  );
};

export const postReminderEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.POST_REMINDER),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${
            action.payload.userId
          }/reminders.json`,
          "POST",
          action.payload.body
        )
      ).pipe(mergeMap(() => [getRemindersList(action.payload.userId)]))
    )
  );
};

export const deleteReminderEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.DELETE_REMINDER),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${
            action.payload.userId
          }/reminders/${action.payload.id}.json`,
          "DELETE"
        )
      ).pipe(mergeMap(() => [getRemindersList(action.payload.userId)]))
    )
  );
};

export const editReminderEpic = action$ => {
  return action$.pipe(
    ofType(actionTypes.EDIT_REMINDER),
    switchMap(action =>
      ajax(
        params(
          `https://reminder-app-548d7.firebaseio.com/${
            action.payload.userId
          }/reminders/${action.payload.id}.json`,
          "PATCH",
          action.payload.body
        )
      ).pipe(mergeMap(() => [getRemindersList(action.payload.userId)]))
    )
  );
};
