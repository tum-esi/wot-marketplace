# Routes

## Guidelines

- All main route branches should have their corresponding script.
- Each script should have the initialization of a new router and corresponding routes defined as relative paths to the route branch.
- The routers are then exported from each script and imported in the `index.ts` script to be exported in a single wrapper function which initializes the routes.

## Additional Information