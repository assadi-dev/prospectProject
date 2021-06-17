import {
  ADD_ENTREPRISE,
  GET_ENTREPRISE_USER,
  GET_ENTREPRISE_UNCHECKED,
} from "../action/EntrepriseAction";

const initialState = {
  isLoading: true,
  dataCollection: null,
  unCheckCollection: null,
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

    case GET_ENTREPRISE_UNCHECKED:
      return {
        ...state,
        isLoading: false,
        unCheckCollection: action.payload,
      };

      break;

    case ADD_ENTREPRISE:
      return {
        ...state,
        isLoading: false,
      };

      break;

    default:
      return state;
  }
};
