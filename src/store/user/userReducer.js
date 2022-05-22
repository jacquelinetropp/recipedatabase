import * as actions from "./userTypes";

const initialState = {
  error: null,
  loading: false,
  measurements: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload
      };
    case actions.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

      case actions.SET_MEASUREMENTS:
        return {
          ...state,
          measurements: payload
        }

    default:
      return state;
  }
};
