import types from './types';

const initialState = {
  loaded: false,
  loading: false,
  isAuthed: false,
  userId: null,
  notifications: {},
  passwordRecovery: {},
};

const authReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.notifications
  ) {
    newState = {
      ...state,
      notifications: {
        ...state.notifications,
        ...action.payload.entities.notifications,
      },
    };
  }

  switch (action.type) {
    case types.AUTH.SUCCESS: {
      return {
        ...newState,
        isAuthed: true,
        userId: action.payload.result,
      };
    }

    case types.AUTH.FAILURE: {
      localStorage.removeItem('token');

      return {
        ...newState,
        isAuthed: false,
        userId: null,
        loaded: false,
      };
    }

    case types.LOGOUT.SUCCESS: {
      return {
        ...initialState,
      };
    }

    case types.RECOVER_PASSWORD_CHANGE.REQUEST: {
      return {
        ...newState,
        passwordRecovery: {
          ...newState.passwordRecovery,
          error: undefined,
        },
      };
    }

    case types.RECOVER_PASSWORD_CHANGE.SUCCESS: {
      return {
        ...newState,
        passwordRecovery: {},
      };
    }

    case types.RECOVER_PASSWORD_CHANGE.FAILURE: {
      return {
        ...newState,
        passwordRecovery: {
          ...newState.passwordRecovery,
          error: action.message,
        },
      };
    }

    case types.VERIFY_RECOVER_CODE.REQUEST: {
      return {
        ...newState,
      };
    }

    case types.VERIFY_RECOVER_CODE.SUCCESS: {
      return {
        ...newState,
        passwordRecovery: {
          verified: true,
          code: action.payload.code,
          userId: action.payload.userId,
        },
      };
    }

    case types.VERIFY_RECOVER_CODE.FAILURE: {
      return {
        ...newState,
        passwordRecovery: {
          error: action.message,
        },
      };
    }

    case types.UPLOAD_PROFILE_IMAGE.REQUEST: {
      return {
        ...newState,
        loading: true,
      };
    }

    case types.UPLOAD_PROFILE_IMAGE.SUCCESS: {
      return {
        ...newState,
        loading: false,
      };
    }

    case types.UPLOAD_PROFILE_IMAGE.FAILURE: {
      return {
        ...newState,
        loading: false,
      };
    }

    default:
      return newState;
  }
};

export default authReducer;
