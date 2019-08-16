import axios from 'axios';

export const register = async (newUser: Object) => {
  try{
    let response = await axios.post('/api/auth/register', newUser);
    return response;
  }catch(error){
    return error.response;
  };
}

export const login = async (userCredentials: Object) => {
  try {
    let response = await axios.post('/api/auth/login', userCredentials);
    return response.data;
  } catch (err) {
    if(err.response.status === 401){
      return {
        error: "Wrong username or password."
      }
    }
    return {
      error: "Something went wrong."
    };
  }
}
