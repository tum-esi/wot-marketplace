import express from 'express';

export const initializeErrorHandler = (app: express.Application) => {
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let stat: number = 500;
    let response = {
        name: err.name,
        message: {}
    };
    switch(response.name) {
        case "MissingPasswordError":
            stat = 400;
            response.message = "Password field is required.";
            break;
        case "MissingUsernameError":
            stat = 400;
            response.message = "Username field is required.";
            break;
        case "ValidationError":
            stat = 400;
            response.message = "The required fields are not filled properly.";
            break;
        case "InvalidTDError":
            stat = 400;
            response.message = "The Thing description is invalid.";
            break;
        case "IncorrectPasswordError":
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
        case "MissingFieldsError":
            stat= 400;
            response.message = "Please fill in all required fields."
            break;
        case "NotFoundError":
            stat = 404;
            response.message = "Resource not found."
            break;
        default:
            response.message = "Something went wrong.";
            break;
    }
    res.status(stat).send(response);
  });
}