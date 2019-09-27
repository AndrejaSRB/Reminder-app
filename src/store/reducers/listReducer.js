import * as actionTypes from "../actions/actionTypes/lists";

const initialState = {
  lists: [],
  lastListNumber: 0,
};

const formatingObject = data => {
  if (data) {
    let keys = Object.keys(data);
    let values = Object.values(data);
    let listsArray = values.map((item, index) => {
      return {
        id: keys[index],
        value: item
      };
    });
    return listsArray.sort((a, b) => a.value.order - b.value.order)
  }
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LISTS_START:
      return {
        ...state,
        lists: []
      };
    case actionTypes.GET_LISTS_SUCCESS:
      const formatedList = formatingObject(action.payload);
      const order = formatedList ? formatedList.length : 0;
      return {
        ...state,
        lists: formatedList,
        lastListNumber: order
      };
    default:
      return state;
  }
};

export default listReducer;
