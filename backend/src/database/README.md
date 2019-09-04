# Database

## Guidelines

- Models should all be defined in files inside the models folder.
- mongoDB schema definitions should be done internally and the model is then exported to be used.
- All models and interfaces should be imported into the index file then exported in `database` and then exported.
- Database initialization and configuration is also done in an exported function defined in the index file in `database`.

## Additional Information

- Interfaces are used to help typescript type check. Without interface definition, documents created from the models are recognized as a general mongoose document and hence does not have specificly defined variables ( for example `username` for `User` ) from the typescript point of view. Compilation will then fail with errors.
- Interfaces need to inherit from `Document` for usage of mongoose document methods.