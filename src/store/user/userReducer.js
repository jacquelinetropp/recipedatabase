import * as actions from "./userTypes";

const initialState = {
  error: null,
  loading: false,
  measurements: "",
  profile: {
    loading: false,
    error: null,
  },
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
        user: payload,
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
        measurements: payload,
      };
    case actions.PROFILE_START:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
        },
      };
    case actions.PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: false,
        },
      };
    case actions.PROFILE_FAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};
