## HTML

- `/` : index.html
- `/static` : Static CSS & JS


## API

- `/api/search?q=123&count=123&skip=123`  (perform a search)
    + GET:
    {
        query: string,
        totalResults: number,
        shownResults: number,
        startIndex: number,
        results: [{project}, {project}, ...]
    }

- `/api/project/<project-name>`  (get project data / upload project data)
    + GET: JSON containing raw DB data
    + PUT: JSON containing raw DB data

- `/api/validateName`  (check if name is unique, check allowed chars)
    + POST: {name: string} 

- `/api/validateUrl`  (check github URL)
    + POST: {url: string}

- `/api/signup`  (Create new user)
    + POST: {
        username: string,
        emain: string,
        firstName: string,
        lastName: string,
        password: string
    }

- `/api/login`  (login user)
    + POST: {
        username: string,
        password: string 
    }

- `/api/logout`  (logout user) // Not sure this will be needed.
    + POST: {
        sessionID: string 
    }


