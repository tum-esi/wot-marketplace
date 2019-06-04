import axios from "axios";

const baseUrl = "/api/";
const searchUrl = "search?q="
const projectUrl = "projects/"
const loginUrl = "login"
const logoutUrl = "logout"
const registerUrl = "users"
const searchOptions = {
    count: "&count=",
    skip: "&skip="
}
const ERROR_MSGS = {
    login: "login",
    register: "register",
    user: 'user',
    currentUser: 'currentUser',
    newProject: 'newProject',
    projectId: 'projectId',
    unauthorized: "Unauthorized",
    unauthorizedStatus: 401,
    notFound: "Not Found",
    notFoundStatus: 404,
    serverStatus: 500
}

/**
 * 
 * @param {String} searchTerm 
 * @param {Object} options possible search options. e.g { count : 10, skip : 1}
 */
export async function getProjects(searchTerm, options) {
    // Get possible additional search options 
    let searchOption = "";
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            if (key === 'count') {
                searchOption += `${searchOptions.count}${options[key]}`;
            }
            if (key === 'skip') {
                searchOption += `${searchOptions.skip}${options[key]}`;
            }
        }
    }
    // Fetch search results from backend
    try {
        let response = searchTerm ? await axios.get(
            `${baseUrl}${searchUrl}${encodeURIComponent(searchTerm)}${searchOption}`
        ): await axios.get(
            `${baseUrl}${searchUrl}`
        );
        return response.data.results;
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
}

/**
 * 
 * @param {String} projectId 
 */
export async function loadProject(projectId) {
    if (!projectId) return getErrorMessage('projectId');
    let project = null;
    try {
        project = await axios.get(
            `${baseUrl}${projectUrl}${encodeURIComponent(projectId)}`
        );
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
    return project;
}

/**
 * 
 * @param {{ name: String, shortDescription: String, longDescription: String, td: String, implementationType: String, platform: String, complexity: String, topic: Array<String>, github: String, topic: tags<String> }} newProject 
 */
export async function addNewProject(newProject) {
    if (!newProject) return getErrorMessage('newProject');
    try {
        let response = "";
        response = await axios.post(`${baseUrl}${projectUrl}`, newProject);
        console.log('API: ', response);
        return response.data;
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
}

export async function getUser(userName) {
    // eslint-disable-next-line
    // console.log('api getUser oben:', userName);
    if (!userName) return getErrorMessage('user');
    try {
        // eslint-disable-next-line
        // console.log('api url:', `${baseUrl}${registerUrl}/${userName}`);
        let response = await axios.get(`${baseUrl}${registerUrl}/${userName}`);

        // eslint-disable-next-line
        console.log('api getUser:', response);
        return response.data;
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
}

export async function register(newUser) {
    // eslint-disable-next-line
    // console.log('api register:', newUser);
    if (!newUser) return getErrorMessage('register');
    try {
        let response = await axios.post(`${baseUrl}${registerUrl}`, { email: newUser.email, password: newUser.password, username: newUser.username, firstname: newUser.firstName, lastname: newUser.lastName });
        return response.data;
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
}

export async function login(userCredentials) {
    // eslint-disable-next-line
    // console.log('api login:', userCredentials);
    if (!userCredentials) return getErrorMessage('login');
    try {
        let response = await axios.post(`${baseUrl}${loginUrl}`, { username: userCredentials.email, password: userCredentials.password });
        return response.data;
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
}

export async function logout(currentUser) {
    // eslint-disable-next-line
    // console.log('api logout:', currentUser);
    if (!currentUser) return getErrorMessage('currentUser');
    try {
        await axios.post(`${baseUrl}${logoutUrl}`, currentUser);
    } catch (error) {
        return getErrorMessage(error.response.status);
    }
}

function getErrorMessage(error) {
    // eslint-disable-next-line
    console.log("ERROR RESPONSE: ", error);
    let errorMsg = "";
    switch (error) {
        case ERROR_MSGS.login:
            errorMsg = "Please enter a valid username and password."
            break;
        case ERROR_MSGS.register:
            errorMsg = "Please fasijdlaksd"
            break;
        case ERROR_MSGS.newProject:
            errorMsg = "Please do RIGHT"
            break;
        case ERROR_MSGS.projectId:
            errorMsg = "Please do ID"
            break;
        case ERROR_MSGS.user:
            errorMsg = "Please do user"
            break;
        case ERROR_MSGS.currentUser:
            errorMsg = "Please do currentUser"
            break;
        case ERROR_MSGS.unauthorized:
            errorMsg = "Incorrect username or password";
            break;
        case ERROR_MSGS.notFound:
        case ERROR_MSGS.notFoundStatus:
            errorMsg = "This service is currently not available. Please try again later.";
            break;
        case ERROR_MSGS.unauthorizedStatus:
            errorMsg = "You are not logged in. Please log in.";
            break;
        default:
            errorMsg = "There is an unknown problem. Please try again later.";
            break;
    }
    return { error : errorMsg };
}