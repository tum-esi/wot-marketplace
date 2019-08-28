# WoTify Front-End

This is the frontend for WoTify. This frontend is a part of a MEVN stack ( MongoDB, ExpressJS, VueJS, NodeJS ). The structure of this frontend follows the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).

The scripts are written in typescript. To allow accomodate for strict type checks, this frontend uses class-style component syntax and experimental decorators. 

## Getting started

To run the application, run the following command :
```
npm i
npm run serve
```
This will only run the frontend of the whole application. Parts that require API requests to the backend for dynamic components will fail.

## Components
The components are constructed in a class-style manner. For this, experimental decorators such as [vue-class-component](https://github.com/vuejs/vue-class-component), [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) and [vuex-class](https://github.com/ktsn/vuex-class) are used. More information on how the syntax works can be found in the respective repositories.

As stated, the components are structured using the Atomic Design principle. 
- Any component that uses only default html tags should be categorized as atoms. 
- Any component that uses at least one atom should be categorized as molecules.
- Any component that uses at least one molecule should be categorized as organisms.
- Any component that takes the remaining space of the view after the header and footer are mounted should be categorized as pages.

## Routing
Routing in the application is done via [vue-router](https://router.vuejs.org/). All routes are and should be explicitly defined in the `router.ts` script. All routing done in the application by the user should be done using `aNavLink` component which is a wrapper component for `router-link`s.

## State Management
State management is done using [vuex](https://vuex.vuejs.org/). States are organized in modules. A module should only be created when a significant number of components are required to share and pass information to achieve a certain functionality. Existing modules are currently the `authentication` and `library` modules.   
  
The `authentication` module handles the client-side storage of web tokens and currently logged username. Since some API requests require token authentication by providing a bearer token on the `Authorization` header of the request, this module allows different parts of the application to keep track of the currently logged user and make corresponding requests using the web token stored locally. 

The `library` module handles the loading of search results and pagination of the library. The information to keep track of the projects stored in the database are stored in this module.

If different components need to interact with the state, it should always be through actions and not mutations. The actions should be the ones committing the mutations to change the state.

## API Wrapper
HTTP requests made by the frontend uses [axios](https://github.com/axios/axios). Some requests require authentication using a web token and hence requires configuration of the header when sending the requests. Examples can be found in the source code.

## Styling
To make the components more reusable, general css styling for a certain usage should be written inside the component. That way, specifying the corresponding class from outside the component will automatically apply all the correspondings css styles to the component without much effort. Further more customized styling is of course possible throught the parent component which uses the component.

## Production

To build for production, run :
```
npm run build
```