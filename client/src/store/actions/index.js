const uri = 'http://localhost:8000/api/v1'

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
          cb(false)
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
          cb(false)
        }
      })
    }
	},
	
	createBoard: (data, userId, cb) => dispatch => {
		fetch(`${uri}/${userId}/createboard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data, 'checking data after create board')
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
	getBoards: (userId) => dispatch => {
		fetch(`${uri}/${userId}/getboards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(boards => {
			console.log(boards, 'getting boards from server');
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
	getSingleBoard: (userId, boardId) => dispatch => {
		fetch(`${uri}/${userId}/board/${boardId}`, {
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
					board: board.board
				})
			} else {
				dispatch({
					type: 'GET_SINGLE_BOARD_FAIL',
					error: board.error
				})
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

	getLists: () => dispatch => {
		fetch(`${uri}/getlists`, {
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

	// Creating new card
	createCard: (data) => dispatch => {
		fetch(`${uri}/board/:id/list/:id/createcard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(card => console.log(card, 'getting card from db'))
	}
}

export default actions;