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
    return response;
  } catch (error) {
    return error.response;
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
    return response;
  }catch(error){
    return error.response;
  }
}

export const getProject = async (projectName: string) => {
  try{
    let response = await axios.get(`/api/projects/${projectName}`);
    return response;
  }catch(error){
    return error.response;
  }
}

export const deleteProject = async (projectName: string, userToken: string) => {
  try{
    let axiosConfig = {
      headers: {
        "Authorization": `Bearer ${userToken}` 
      }
    };
    let response = await axios.delete(`/api/projects/${projectName}`, axiosConfig);
    return response;
  }catch(error){
    return error.response;
  }
}

export const editProject = async (projectName: string, projectChanges: object, userToken: string) => {
  try{
    let axiosConfig = {
      headers: {
        "Authorization": `Bearer ${userToken}` 
      }
    };
    let response = await axios.put(`/api/projects/${projectName}`, projectChanges, axiosConfig);
    return response;
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

export const getUser = async (username: string, userToken: string)  => {
  try{
    let axiosConfig = {
      headers: {
        "Authorization": `Bearer ${userToken}` 
      }
    };
    let response = await axios.get(`/api/users/${username}`, axiosConfig);
    return response;
  }catch(error){
    return error.response;
  }
}

export const editUser = async (username: string, profileChanges: object, userToken: string) => {
  try{
    let axiosConfig = {
      headers: {
        "Authorization": `Bearer ${userToken}` 
      }
    };
    let response = await axios.put(`/api/users/${username}`, profileChanges, axiosConfig);
    return response;
  }catch(error){
    return error.response;
  }
}