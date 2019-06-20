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
	
	createBoard: (data, cb) => dispatch => {
		fetch(`${uri}/createboard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			if (data.message) {
				const { board } = data;
				localStorage.setItem('Board', JSON.stringify(board))
				dispatch({
					type: 'BOARD_CREATE_SUCCESS',
					board: board
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

	createList: (data, cb) => dispatch => {
		fetch(`${uri}/createlist`, {
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
	}
}

export default actions;