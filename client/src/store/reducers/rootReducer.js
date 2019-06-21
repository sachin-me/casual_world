const initState = {
  message: '',
  error: '',
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
	currentToken: localStorage.getItem('token') || null,
	list: {},
	allLists: [],
	boards: []
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
        // user: action.user
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
				boards: action.boards
			}
		}

		case 'BOARD_CREATE_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'BOARDS_GET_SUCCESS': {
			return {
				...state,
				boards: action.boards
			}
		}

		case 'BOARDS_GET_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'GET_SINGLE_BOARD_SUCCESS': {
			return {
				...state,
				board: action.board
			}
		}

		case 'GET_SINGLE_BOARD_FAIL': {
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