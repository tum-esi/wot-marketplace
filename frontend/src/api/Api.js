import axios from "axios";

const baseUrl = "/api/";
const searchUrl = "search?q="
const projectUrl = "projects/"
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
        // eslint-disable-next-line 
        console.log(response.data.results)
        return response.data.results;
    } catch (error) {
        // eslint-disable-next-line 
        console.log("=== error", error);
        throw error;
    }
}

/**
 * 
 * @param {String} projectId 
 */
export async function loadProject(projectId) {
    if (!projectId) return;

    // load project from backend
    let project = null;
    try {
        project = await axios.get(
            `${baseUrl}${projectUrl}${encodeURIComponent(projectId)}`
        );
    } catch (error) {
        throw error;
    }
    return project;
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
}

/**
 * 
 * @param {{ name: String, shortDescription: String, longDescription: String, td: String, implementationType: String, platform: String, complexity: String, topic: Array<String>, github: String, topic: tags<String> }} newProject 
 */
export async function addNewProject(newProject) {
    if (!newProject) return;
    try {
        await axios.post(newProject);
        return "success";
    } catch (error) {
        throw error;
    }
}

// export function register(newUser) {

// }

// export function login(userCredentials) {

// }