import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.response.use(res=> res.data, err=> Promise.reject(err.response))

export const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }
// const getAuthHeader = () => ({Authorization: `Bearer ${store.getState().token}`})

export const ApiService = {

    login(item) {
        return axios.post('/api/auth', item)  
    },

    signup(item) {
        return axios.post('/api/users', item)  
    },

    auth() {
        return axios.get('/api/auth')
    }
    // editMyProfile(id, item) {
    //     return axios.put(`users/${id}/info`, item, {headers: getAuthHeader()})  
    // },

    // getUser(id) {
    //     return axios.get(`users/${id}`, {headers: getAuthHeader()})  
    // }
}