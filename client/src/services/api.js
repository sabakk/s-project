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

  // auth

    login(item) {
        return axios.post('/api/auth', item)  
    },

    signup(item) {
        return axios.post('/api/users', item)  
    },

    auth() {
        return axios.get('/api/auth')
    },

// Profile

    getCurrentProfile() { 
       return axios.get('/api/profile/me')
    },

    getProfiles() {
      return axios.get('/api/profile')
    },

    getProfileById(userId) {
      return axios.get(`/api/profile/user/${userId}`)
    },
    getGithubRepos(username) {
      return axios.get(`/api/profile/github/${username}`)
    },
    createProfile(formData) {
      return axios.post('/api/profile', formData)
    },
    addExperience(formData){
      return axios.put('/api/profile/experience', formData)
    },
    addEducation(formData){
      return axios.put('/api/profile/education', formData)
    },
    deleteExperience(id){
      return axios.delete(`/api/profile/experience/${id}`)
    },
    deleteEducation(id){
      return axios.delete(`/api/profile/education/${id}`)
    },
    deleteAccount(){
      return axios.delete('/api/profile')
    },

    // Vapes

    getPosts(){
      return axios.get('/api/posts')
    },
    addPost(formData){
      return axios.post('/api/posts', formData)
    },
    deletePost(id){
      return axios.delete(`/api/posts/${id}`)
    },
    getPost(id){
      return axios.get(`/api/posts/${id}`)
    },
    addComment(postId, formData){
      return axios.post( `/api/posts/comment/${postId}`, formData)
    },
    deleteComment(postId, commentId){
      return axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    },
    addLike(id){
      return axios.put(`/api/posts/like/${id}`)
    },
    removeLike(id){
      return axios.put(`/api/posts/unlike/${id}`)
    },
  }