import {
  ADD_ENTREPRISE,
  GET_ENTREPRISE_USER,
  GET_ENTREPRISE_UNCHECKED,
  DELETE_ENTREPRISE,
  GET_ENTREPRISE_CHECKED,
  UPDATE_CHECK,
  UPDATE_UNCHECK,
  GET_ENTREPRISE_SINGLE,
} from "../action/EntrepriseAction";

const initialState = {
  isLoading: true,
  dataCollection: [],
  unCheckCollection: [],
  checkCollection: [],
  currentData: [],
};

export default entrepriseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTREPRISE_USER:
      return {
        ...state,
        isLoading: false,
        dataCollection: action.payload,
      };
      break;
    case GET_ENTREPRISE_SINGLE:
      return {
        ...state,
        isLoading: false,
        currentData: action.payload,
      };
      break;
    case GET_ENTREPRISE_UNCHECKED:
      return {
        ...state,
        isLoading: false,
        unCheckCollection: action.payload,
      };
      break;
    case GET_ENTREPRISE_CHECKED:
      return {
        ...state,
        isLoading: false,
        checkCollection: action.payload,
      };
      break;
    case ADD_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
        dataCollection: [...state.dataCollection, action.payload],
        unCheckCollection: [action.payload, ...state.unCheckCollection],
      };
      break;
    case DELETE_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
        dataCollection: [
          ...state.dataCollection.filter((item) => item.id != action.payload),
        ],
        unCheckCollection: [
          ...state.unCheckCollection.filter(
            (item) => item.id != action.payload
          ),
        ],
        checkCollection: [
          ...state.checkCollection.filter(
            (item) => item.id != action.payload.id
          ),
        ],
      };
      break;
    case UPDATE_CHECK:
      return {
        ...state,
        isLoading: false,
        dataCollection: state.dataCollection.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,

              checked: action.payload.checked,
            };
          }
          return item;
        }),
        unCheckCollection: state.unCheckCollection.filter(
          (item) => item.id != action.payload.id
        ),
        checkCollection: [action.payload, ...state.checkCollection],
      };
      break;

    case UPDATE_UNCHECK:
      return {
        ...state,
        isLoading: false,
        dataCollection: state.dataCollection.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,

              checked: action.payload.checked,
            };
          }
          return item;
        }),
        unCheckCollection: [action.payload, ...state.unCheckCollection],
        checkCollection: state.checkCollection.filter(
          (item) => item.id != action.payload.id
        ),
      };
      break;

    default:
      return state;
  }
};
