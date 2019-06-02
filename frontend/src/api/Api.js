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

/**
 * 
 * @param {String} searchTerm 
 * @param {Object} options possible search options. e.g { count : 10, skip : 1}
 */
export async function getProjects(searchTerm, options) {
    if (!searchTerm) return "";

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
        let response = await axios.get(
            `${baseUrl}${searchUrl}${encodeURIComponent(searchTerm)}${searchOption}`
        );
        return response.data.results;
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {String} projectId 
 */
export async function loadProject(projectId) {
    if (!projectId) return;
    let project = null;
    try {
        project = await axios.get(
            `${baseUrl}${projectUrl}${encodeURIComponent(projectId)}`
        );
    } catch (error) {
        throw error;
    }
    return project;
}

/**
 * 
 * @param {{ name: String, shortDescription: String, longDescription: String, td: String, implementationType: String, platform: String, complexity: String, topic: Array<String>, github: String, topic: tags<String> }} newProject 
 */
export async function addNewProject(newProject) {
    if (!newProject) return;
    try {
        let response = await axios.post(`${baseUrl}${projectUrl}`, newProject);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getUser(userName) {
      // eslint-disable-next-line
      console.log('api getUser oben:', userName);
    if (!userName) return;
    try {
         // eslint-disable-next-line
    console.log('api url:', `${baseUrl}${registerUrl}/${userName}`);
        let response = await axios.get(`${baseUrl}${registerUrl}/${userName}`);

            // eslint-disable-next-line
    console.log('api getUser:', response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function register(newUser) {
    // eslint-disable-next-line
    console.log('api register:', newUser);
    if (!newUser) return;
    try {
        let response = await axios.post(`${baseUrl}${registerUrl}`, { email: newUser.email, password: newUser.password, username: newUser.username, firstname: newUser.firstName, lastname: newUser.lastName });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function login(userCredentials) {
    // eslint-disable-next-line
    console.log('api login:', userCredentials);
    if (!userCredentials) return;
    try {
        let response = await axios.post(`${baseUrl}${loginUrl}`, { username: userCredentials.email, password: userCredentials.password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function logout(currentUser) {
    // eslint-disable-next-line
    console.log('api logout:', currentUser);
    if (!currentUser) return;
    try {
        await axios.post(`${baseUrl}${logoutUrl}`, currentUser);
    } catch (error) {
        throw error;
    }
}

// Dummy project 
    // return [
    //     {
    //         name: "SenseHAT_python",
    //         shortDescription: "senseHAT WoT implementation in python",
    //         longDescription: projectDescription,
    //         td: {},
    //         implementationType: "code",
    //         platform: "arduino",
    //         complexity: "expert",
    //         topic: ["actuator", "other", "sensor", "robotics"],
    //         github: "https://github.com/DK<~LeZK3s",
    //         tags: ["python", "sensehat"],
    //     }
    // ];