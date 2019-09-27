import * as actionTypes from "../actions/actionTypes/reminders";
import { isTomorrow, isToday, isFuture, isPast } from "date-fns";

const initialState = {
  reminders: [],
  splashScreen: false,
  today: [],
  tomorrow: [],
  upcoming: [],
  highImportance: [],
  mediumImportance: [],
  lowImportance: [],
  isFiltered: false,
  isFilterRouteHidden: false
};

const formatingObject = data => {
  if (data) {
    let keys = Object.keys(data);
    let values = Object.values(data);
    return values.map((item, index) => {
      return {
        id: keys[index],
        value: item
      };
    });
  }
};

const compareDate = element =>
  isToday(new Date(element.value.date))
    ? { date: 0, element: element }
    : isTomorrow(new Date(element.value.date))
    ? { date: 1, element: element }
    : isFuture(new Date(element.value.date))
    ? { date: 2, element: element }
    : isPast(new Date(element.value.date))
    ? { date: 0, element: element }
    : null;

const formatingDates = list => {
  let upcoming = [];
  let tomorrow = [];
  let today = [];
  if (list.length) {
    list.forEach(element => {
      let date = compareDate(element);
      return date.date === 0
        ? today.push(date.element)
        : date.date === 1
        ? tomorrow.push(date.element)
        : date.date === 2
        ? upcoming.push(date.element)
        : null;
    });
  }
  return {
    today: today,
    upcoming: upcoming,
    tomorrow: tomorrow
  };
};

const sortByImportance = list => {
  let high = [];
  let medium = [];
  let low = [];
  if (list.length) {
    list.forEach(element =>
      element.value.importance === "high"
        ? high.push(element)
        : element.value.importance === "medium"
        ? medium.push(element)
        : element.value.importance === "low"
        ? low.push(element)
        : null
    );
  }
  return {
    high: high,
    medium: medium,
    low: low
  };
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REMINDERS_LIST_SUCCESS:
      if (action.payload === null) {
        return {
          ...state,
          splashScreen: false
        };
      } else {
        let data = formatingObject(action.payload);
        let dates = formatingDates(data);
        let importance = sortByImportance(data);
        return {
          ...state,
          reminders: data,
          today: dates.today,
          upcoming: dates.upcoming,
          tomorrow: dates.tomorrow,
          splashScreen: false,
          highImportance: importance.high,
          mediumImportance: importance.medium,
          lowImportance: importance.low,
          isFiltered: false
        };
      }
    case actionTypes.USER_LOGGED_IN:
      return {
        ...state,
        splashScreen: true
      };
    case actionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        reminders: [],
        splashScreen: false,
        today: [],
        tomorrow: [],
        upcoming: [],
        highImportance: [],
        mediumImportance: [],
        lowImportance: [],
        criterium: null,
        isFiltered: false
      };
    case actionTypes.RENDER_FILTER_ROUTE:
      return {
        ...state,
        isFilterRouteHidden: false
      };
    case actionTypes.DELETE_FILTER_ROUTE:
      return {
        ...state,
        isFilterRouteHidden: true
      };
    default:
      return state;
  }
};

export default remindersReducer;
