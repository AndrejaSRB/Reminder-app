import { combineEpics } from "redux-observable";
import {
  fetchReminderListEpic,
  postReminderEpic,
  deleteReminderEpic,
  editReminderEpic
} from "./epics/reminders";
import {
  addListEpic,
  getListsEpic,
  deleteListEpic,
  editListEpic,
  updateListEpic,
} from "./epics/lists";
const rootEpic = combineEpics(
  fetchReminderListEpic,
  postReminderEpic,
  deleteReminderEpic,
  editReminderEpic,
  addListEpic,
  getListsEpic,
  deleteListEpic,
  editListEpic,
  updateListEpic
);

export default rootEpic;
