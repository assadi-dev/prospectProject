import {
  ADD_ENTREPRISE,
  GET_ENTREPRISE_USER,
} from "../action/EntrepriseAction";

const initialState = {
  isLoading: true,
  data: null,
};

export default entrepriseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTREPRISE_USER:
      return {
        isLoading: false,
        data: action.payload,
      };
      break;
      switch (action.type) {
        case ADD_ENTREPRISE:
          return {
            ...state,
            isLoading: false,
          };
      }
      break;

    default:
      return state;
      break;
  }
};
