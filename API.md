## HTML

- `/` : index.html
- `/static` : Static CSS & JS


## API

- `/api/search?q=123&count=123`  (perform a search)
    + GET: [{project}, {project}, ...]

- `/api/project/<project-name>`  (get project data / upload project data)
    + GET: JSON containing raw DB data
    + PUT: JSON containing raw DB data

- `/api/validateName`  (check if name is unique, check allowed chars)
    + POST: {name: string} 

- `/api/validateUrl`  (check github URL)
    + POST: {url: string}



