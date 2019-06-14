const initState = {
  message: '',
  error: '',
  user: {}
}

function rootReducer (state = initState, action) {
  switch(action.type) {
    case 'CREATE_USER_SUCCESS': {
      return {
        ...state,
        message: action.message
      }
    }

    case 'CREATE_USER_FAIL': {
      return {
        ...state,
        error: action.error
      }
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        message: action.message,
        user: action.user
      }
    }

    case 'LOGIN_FAIL': {
      return {
        ...state,
        error: action.error
      }
    }

    default: return state;
  }
}

export default rootReducer;