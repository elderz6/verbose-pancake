import axios from 'axios';

export default {
  user:{
    login: credentials =>
      axios.post('/api/auth',  credentials)
        .then(res => res.data.user)
        .catch( err => console.log(err)),
    signup: user =>
      axios.post('/api/users',  user )
        .then(res => res.data.user),
    confirm: user => axios.post('/api/auth/confirmation', user.token)
      .then(res => res.data.user)
      .catch(err => console.log(err))
  }
};
