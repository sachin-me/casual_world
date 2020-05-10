import axios from 'axios';
const uri = '/api/v1'

const api = {
    getCurrentUser: function () {
        const user = JSON.parse(localStorage.getItem('user'));
        const { id } = user;
        
        let config = {};
        config.headers = {
            id
        }
        axios.get(`${uri}/me`, config);
    }
}

export default api;