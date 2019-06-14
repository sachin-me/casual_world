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
  }
}

export default actions;