import axios from 'axios';

const setAuthToken = (token) => {
  //if you have a token, send it with every request.
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
