const initState = {
  message: '',
  error: '',
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
	currentToken: localStorage.getItem('token') || null,
	board: JSON.parse(localStorage.getItem('Board')) || null,
	list: {},
	allLists: []
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
        currentUser: action.user,
        currentToken: action.token,
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
		
		case 'BOARD_CREATE_SUCCESS': {
			return {
				...state,
				board: action.board
			}
		}

		case 'BOARD_CREATE_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'LIST_CREATE_SUCCESS' : {
			return {
				...state,
				list: action.list
			}
		}

		case 'LIST_CREATE_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'GET_LISTS_SUCCESS': {
			return {
				...state,
				allLists: action.lists
			}
		}

		case 'GET_LISTS_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

    default: return state;
  }
}

export default rootReducer;