import express from 'express';

/**
 * Error handling middleware for the express application
 * Identifies error by name and generates response with corresponding status and message
 * 
 * @param app 
 */
export const initializeErrorHandler = (app: express.Application) => {
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let stat: number = 500;
    let response = {
        name: err.name,
        message: {}
    };
    switch(response.name) {
        case "MissingPasswordError": // error thrown by passport-local-mongoose
            stat = 400;
            response.message = "Password field is required.";
            break;
        case "MissingUsernameError": // error thrown by passport-local-mongoose
            stat = 400;
            response.message = "Username field is required.";
            break;
        case "ValidationError": // error thrown by mongoose on missing required fields
            stat = 400;
            response.message = "The required fields are not filled properly.";
            break;
        case "InvalidTDError": // custom error thrown upon failure of TD validation
            stat = 400;
            response.message = "The Thing description is invalid.";
            break;
        case "InvalidUrlError": // custom error thrown upon failure of regex matching for urls
            stat = 400;
            response.message = "Please format the URL specified correctly.";
            break;
        case "IncorrectPasswordError": // error thrown by passport-local-mongoose
            stat = 401;
            response.message = "Password is incorrect.";
            break;
        case "UnauthorizedError": 
            stat = 401;
            response.message = "Invalid user credentials."
            break;
        case "TypeError":
            stat = 400;
            response.message = "Please verify your input."
            break;
        case "MissingFieldsError": // custom error thrown on missing fields
            stat= 400;
            response.message = "Please fill in all required fields."
            break;
        case "NotFoundError": // custom error thrown when unable to find resource
            stat = 404;
            response.message = "Resource not found."
            break;
        case "SyntaxError": // error thrown upon failure to parse string to JSON object
            stat = 400;
            response.message = "Invalid JSON object on Thing Description field.";
            break;
        case "NotAllowedError":
            stat = 400;
            response.message = "Request is not allowed.";
            break;
        default: // default error
            console.log(err);
            response.message = "Something went wrong.";
            break;
    }
    res.status(stat).send(response);
  });
}