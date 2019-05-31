## HTML

- `/` : static/index.html
- `/static/` : static/
- `/js/` : static/js/
- `/css/`: static/css/


## API

- `/api/search?q=123&count=123&skip=123`  (perform a search)
    + GET
    + returns:
    {
        query: string,
        totalResults: number,
        shownResults: number,
        startIndex: number,
        results: [{project}, {project}, ...]
    }

- `/api/projects`  (Create new project)
    + POST: {
        name: string,
        shortDescription: string,
        ... 
        // See Schema for all fields
    }

- `/api/projects/<project-name>`  (get project data / upload project data / delete project)
    + GET: returns JSON containing raw DB data
    + PUT: gets JSON describing project - login needed
    + DELETE: gets JSON describing project - login needed

- `/api/users`  (Create new user)
    + POST: {
        username: string,
        emain: string,
        firstName: string,
        lastName: string,
        password: string
    }

- `/api/users/<user-name>`  (get user data / upload user data / delete user)
    + GET: returns JSON containing raw DB data
    + PUT: gets JSON describing user - login needed
    + DELETE: gets JSON describing user - login needed

- `/api/validators/validateUsername`  (check if name is unique, check allowed chars)
    + POST: {name: string} 

- `/api/validators/validateUrl`  (check github URL) <NOT IMPLEMENTED>
    + POST: {url: string}


- `/api/login`  (login user)
    + POST: {
        username: string,
        password: string 
    }

- `/api/logout`  (logout user)
    + POST: {
        sessionID: string 
    }


