import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';
import api from '../api/api';

export const userLoggedIn = user => ({
  type:USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
  api.user.login(credentials)
    .then(user =>
    {
      localStorage.bookJWT = user.token;
      dispatch(userLoggedIn(user));
    })
    .catch(err => console.log(err));

export const logout = () => dispatch =>
{
  localStorage.removeItem('bookJWT');
  dispatch(userLoggedOut());
};
