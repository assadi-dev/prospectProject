import {
  GET_RENDEZ_VOUS_CHECKED,
  GET_RENDEZ_VOUS_UNCHECKED,
  GET_RENDEZ_VOUS_USER,
  UPDATE_CHECK_RDV,
  UPDATE_UNCHECK_RDV,
  DELETE_RENDEZ_VOUS,
} from "../action/RendezVousAction";

const initialState = {
  isLoading: true,
  dataCollection: [],
  unCheckCollection: [],
  checkCollection: [],
};

export default rendezVousReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RENDEZ_VOUS_USER:
      return {
        ...state,
        isLoading: false,
        dataCollection: action.payload,
      };
      break;
    case GET_RENDEZ_VOUS_UNCHECKED:
      return {
        ...state,
        isLoading: false,
        unCheckCollection: action.payload,
      };
      break;
    case GET_RENDEZ_VOUS_CHECKED:
      return {
        ...state,
        isLoading: false,
        checkCollection: action.payload,
      };
      break;
    case UPDATE_CHECK_RDV:
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
    case UPDATE_UNCHECK_RDV:
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
    case DELETE_RENDEZ_VOUS:
      return {
        ...state,
        dataCollection: state.dataCollection.filter(
          (item) => item.id != action.payload
        ),
      };

    default:
      return state;
      break;
  }
};
