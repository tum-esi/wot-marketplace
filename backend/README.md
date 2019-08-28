# WoTify Back-End

This is the backend for WoTify. This backend is a part of a MEVN stack ( MongoDB, ExpressJS, VueJS, NodeJS ). The structure of this backend application is organized in a way that major parts are grouped together to help comprehension and ease edits.

## Getting started

A `.env` file is required for this application to run properly. The file looks like this :
```
SECRET_CODE=
SVR_PORT=
DB_HOST=
DB_DEV_NAME=
DB_DEV_USER=
DB_DEV_PASS=

DB_PROD_NAME=
DB_PROD_USER=
DB_PROD_PASS=
```
The empty fields are to be filled with the corresponding values.  

- `SECRET_CODE` is the key used for serialization and deserialization of JSON Web tokens.
- `SVR_PORT` specifies the port the server listens to.
- Anything prefixed with `DB_` corresponds to the database configuration, with `HOST` as the url of the mongoDB server and `NAME` as the name of the database.

With a `.env` file, to start the server for development with HMR, run the following command:
```
npm run dev
```

## Folders

Each major components of the application has its own folder. More information regarding the components can be found in the README in their respective directories. Folders containing a `index.ts` script means importing the folder without specifying the script will resolve to importing the `index.ts` script by default. This is an expected and wanted behaviour as imports from other scripts of the same folder and the export of a single wrapper function is done inside this specific script.

### The `assets` folder

This folder groups all the non-script files which are required by the application.

### The `controllers` folder

This folder groups all the route handler functions. The scripts here contain the logic of the handling of each route.

### The `database` folder

This folder groups everything related to the database. Model definitions are done in their individual scripts stored in the `models` sub-folder.

### The `middlewares` folder

This folder groups all the middlewares used by the express application. The custom error-handling middleware is also in this folder.

### The `routes` folder

This folder groups all the route initialization scripts.

## Production

To build for production,
```
npm run build
```