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

export const createProject = async (newProject: Object, userToken: string) => {
  try{
    let axiosConfig = {
      headers: {
        "Authorization": `Bearer ${userToken}` 
      }
    };
    let response = await axios.post('/api/projects', newProject, axiosConfig);
    return response.data;
  }catch(error){
    return error.response;
  }
}

export const searchProjects = async (searchOptions: Object) => {
  try{
    let response = await axios.get('/api/search', 
    { 
      params: {
        ...searchOptions
      } 
    });
    return response.data;
  }catch(error){
    return error.response;
  }
}