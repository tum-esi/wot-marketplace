# Middlewares

## Guidelines  

- All middlewares used by the express application should be imported and initialized in this folder.
- One-liner initializations should be made in the `other.ts` script.
- All middleware initialization functions should be exported from their respective scripts to the `index.ts` and then exported in a single wrapper function. 

## Additional Information

- All error handling should be done in the `errorHandler.ts` middleware.