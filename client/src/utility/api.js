const uri = '/api/v1'

const api = {
    getCurrentUser: (cb) => dispatch => {
        // const user = JSON.parse(localStorage.getItem('user'));
        // const { id } = user;

        let config = {};
        // config.headers = {
        //     id
        // }
        fetch(`${uri}/me`, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin', // send cookies
        })
            .then(res => res.json())
            .then(curUser => {

                if (curUser.message) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        user: curUser.currentUser,
                        message: curUser.message,
                    })
                    cb(false);
                }
                cb(true);
            });
    }
}

export default api;