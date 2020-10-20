const uri = '/api/v1'

const actions = {
	createUser: (data, cb) => {
		return dispatch => {
			fetch(`${uri}/createUser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(user => {
					if (user.message) {
						dispatch({
							type: 'CREATE_USER_SUCCESS',
							message: user.message
						})
						cb(true)
					} else {
						dispatch({
							type: 'CREATE_USER_FAIL',
							error: user.error
						})
						cb(false, user.error)
					}
				})
		}
	},

	loginUser: (data, cb) => {
		return dispatch => {
			fetch(`${uri}/loginuser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => {
					if (data.message) {
						const { userInfo, token, message } = data;
						let jwt = `Bearer ${token}`
						localStorage.setItem('token', jwt);
						localStorage.setItem('user', JSON.stringify(userInfo));
						dispatch({
							type: 'LOGIN_SUCCESS',
							message,
							token: jwt,
							user: userInfo
						})
						cb(true)
					} else {
						dispatch({
							type: 'LOGIN_FAIL',
							error: data.error
						})
						cb(false, data.error)
					}
				})
		}
	},

	// logout user action
	logout: (cb) => dispatch => {
		fetch(`${uri}/logout`, {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin', // send cookies
		})
			.then(res => res.json())
			.then(user => { 
				if (user.message) {
					dispatch({
						type: 'LOGOUT_USER'
					})
					cb(true)
				}
			})
	},

	createBoard: (data, cb) => dispatch => {
		fetch(`${uri}/createboard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin', // send cookies
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(data => {
				if (data.message) {
					const { createdBoard } = data;
					dispatch({
						type: 'BOARD_CREATE_SUCCESS',
						board: createdBoard
					})
					cb(true)
				} else {
					dispatch({
						type: 'BOARD_CREATE_FAIL',
						error: data.error
					})
					cb(false)
				}
			});
	},

	// getting boards
	getBoards: () => dispatch => {
		fetch(`${uri}/getboards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin', // send cookies
		})
			.then(res => res.json())
			.then(boards => {
				if (boards.message) {
					dispatch({
						type: 'BOARDS_GET_SUCCESS',
						boards: boards.boards
					})
				} else {
					dispatch({
						type: 'BOARDS_GET_FAIL',
						error: boards.error
					})
				}
			})
	},

	// Getting single board
	getSingleBoard: (slug, cb) => dispatch => {
		fetch(`${uri}/board/${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(board => {
				if (board.message) {
					dispatch({
						type: 'GET_SINGLE_BOARD_SUCCESS',
						singleBoard: board.board
					})
					cb(true);
				} else {
					dispatch({
						type: 'GET_SINGLE_BOARD_FAIL',
						error: board.error
					})
					cb(false);
				}
			})
	},

	// Deleting a particular board
	deleteBoard: (boardId) => dispatch => {
		fetch(`${uri}/board/${boardId}/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(board => {
				if (board.message) {
					dispatch({
						type: 'DELETE_BOARD_SUCCESS',
						boards: board.updatedBoard
					})
				} else {
					dispatch({
						type: 'DELETE_BOARD_FAIL',
						error: board.error
					})
				}
			})
	},

	// updating a particular board
	updateBoard: (boardId, data, cb) => dispatch => {
		fetch(`${uri}/board/${boardId}/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(boards => {
				if (boards.message) {
					dispatch({
						type: 'BOARD_UPDATE_SUCCESS',
						boards: boards.boards
					})
					cb(true)
				} else {
					dispatch({
						type: 'BOARD_UPDATE_FAIL',
						error: boards.error
					})
					cb(false)
				}
			})
	},

	createList: (data, id, cb) => dispatch => {
		fetch(`${uri}/board/${id}/createlist`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(list => {
				if (list.message) {
					dispatch({
						type: 'LIST_CREATE_SUCCESS',
						list
					})
					cb(true)
				} else {
					dispatch({
						type: 'LIST_CREATE_FAIL',
						error: list.error
					})
					cb(false)
				}
			})
	},

	getLists: (slug) => dispatch => {
		fetch(`${uri}/board/${slug}/getlists`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(lists => {
				if (lists.message) {
					dispatch({
						type: 'GET_LISTS_SUCCESS',
						lists: lists.lists
					})
				} else {
					dispatch({
						type: 'GET_LISTS_FAIL',
						error: lists.error
					})
				}
			})
	},

	// Updating a particular list
	updateList: (boardId, listId, data, cb) => dispatch => {
		fetch(`${uri}/board/${boardId}/list/${listId}/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(lists => {
				if (lists.message) {
					dispatch({
						type: 'LIST_UPDATE_SUCCESS',
						lists: lists.lists
					})
					cb(true)
				} else {
					dispatch({
						type: 'LIST_UPDATE_FAIL',
						error: lists.error
					})
					cb(false)
				}
			})
	},

	// deleting a particular list
	deleteList: (boardId, listId) => dispatch => {
		fetch(`${uri}/board/${boardId}/list/${listId}/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(lists => {
				if (lists.message) {
					dispatch({
						type: 'DELETE_LIST_SUCCESS',
						lists: lists.updatedList
					})
				} else {
					dispatch({
						type: 'DELETE_LIST_FAIL',
						error: lists.error
					})
				}
			})
	},

	singleList: (slug, cb) => dispatch => {
		fetch(`${uri}/list/${slug}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(list => {
				if (list.message) {
					dispatch({
						type: 'GET_SINGLE_LIST',
						list: list.list
					})
					cb(true)
				} else {
					cb(false)
				}
			})
	},

	// Creating new card
	createCard: (data, boardId, listId, cb) => dispatch => {
		fetch(`${uri}/board/${boardId}/list/${listId}/createcard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(card => {
				if (card.message) {
					dispatch({
						type: 'CREATE_CARD_SUCCESS',
						card
					})
					cb(true)
				} else {
					dispatch({
						type: 'CREATE_CARD_FAIL',
						error: card.error
					})
					cb(false)
				}
			})
	},

	// Getting list of all cards which belongs to a particular list
	getCards: (listId) => dispatch => {
		fetch(`${uri}/list/${listId}/getcards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(cards => {
				if (cards.message) {
					dispatch({
						type: 'GET_CARDS_SUCCESS',
						cards: cards.cards
					})
				} else {
					dispatch({
						type: 'GET_CARDS_FAIL',
						error: cards.error
					})
				}
			})
	},

	// Getting all lists after populating cards
	getAllCards: (slug) => dispatch => {
		fetch(`${uri}/board/${slug}/list/getallcards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(lists => {
				if (lists.message) {
					dispatch({
						type: 'GET_ALL_CARDS_SUCCESS',
						lists: lists.lists
					})
				} else {
					dispatch({
						type: 'GET_ALL_CARDS_FAIL',
						error: lists.error
					})
				}
			})
	},

	// deleting a particular card
	deleteCard: (listId, cardId) => dispatch => {
		fetch(`${uri}/list/${listId}/card/${cardId}/delete`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(cards => {
				if (cards.message) {
					dispatch({
						type: 'DELETE_CARD_SUCCESS',
						cards
					})
				} else {
					dispatch({
						type: 'DELETE_CARD_FAIL',
						error: cards.error
					})
				}
			})
	},

	// updating a particular card
	updateCard: (listId, cardId, data, cb) => dispatch => {
		fetch(`${uri}/list/${listId}/card/${cardId}/update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(cards => {
				if (cards.message) {
					dispatch({
						type: 'CARD_UPDATE_SUCCESS',
						cards
					})
					cb(true)
				} else {
					dispatch({
						type: 'CARD_UPDATE_FAIL',
						error: cards.error
					})
					cb(false)
				}
			})
	},

	// Getting a single card
	getSingleCard: (slug, cb) => dispatch => {
		fetch(`${uri}/card/${slug}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(card => {
				if (card.message) {
					dispatch({
						type: 'GET_SINGLE_CARD',
						card: card.card
					})
					cb(true);
				} else {
					cb(false);
				}
			})
	},

	// Setting task status for a specific card
	updateTaskStatus: (listId, cardId, data, cb) => dispatch => {
		fetch(`${uri}/list/${listId}/card/${cardId}/updatetaskstatus`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(updatedTask => {
				if (updatedTask.message) {
					dispatch({
						type: 'TASK_STATUS_UPDATE_SUCCESS',
						updatedTask
					})
					cb(true)
				} else {
					dispatch({
						type: 'TASK_STATUS_UPDATE_FAIL',
						error: updatedTask.error
					})
					cb(false)
				}
			})
	}
}

export default actions;