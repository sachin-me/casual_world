const initState = {
  message: '',
  error: '',
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
	currentToken: localStorage.getItem('token') || null,
	list: {},
	allLists: [],
	board: {},
	boards: [],
	cards: {},
	getAllCards: []
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
				board: action.singleBoard
			}
		}

		case 'GET_SINGLE_BOARD_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'DELETE_BOARD_SUCCESS': {
			return {
				...state,
				boards: action.boards
			}
		}

		case 'DELETE_BOARD_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'BOARD_UPDATE_SUCCESS': {
			return {
				...state,
				boards: action.boards
			}
		}

		case 'BOARD_UPDATE_FAIL': {
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
			const { lists } = action.lists
			return {
				...state,
				allLists: lists
			}
		}

		case 'GET_LISTS_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'LIST_UPDATE_SUCCESS': {
			return {
				...state,
				allLists: action.lists,
				getAllCards: action.lists
			}
		}

		case 'LIST_UPDATE_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'DELETE_LIST_SUCCESS': {
			return {
				...state,
				allLists: action.lists
			}
		}

		case 'DELETE_LIST_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'GET_CARDS_SUCCESS': {
			return {
				...state,
				cards: action.cards,
				allCards: action.cards.cards
			}
		}

		case 'GET_CARDS_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'GET_ALL_CARDS_SUCCESS': {
			return {
				...state,
				getAllCards: action.lists
			}
		}

		case 'GET_ALL_CARDS_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

		case 'DELETE_CARD_SUCCESS': {
			return {
				...state,
				getAllCards: action.cards.cards,
				allCards: action.cards.cards
			}
		}

		case 'DELETE_CARD_FAIL': {
			return {
				...state,
				error: action.error
			}
		}

    default: return state;
  }
}

export default rootReducer;