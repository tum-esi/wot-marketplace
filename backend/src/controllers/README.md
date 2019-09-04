# Controllers  
  
## Guidelines

- Each major route branch should have a controller file
- Route handler functions should have a signature corresponding to the following, indicating clearly the route name and type of request handled :
```javascript
export const auth_register_post = async (req, res, next)
```
- Operations should be wrapped in a `try catch` block for error handling. A more specific error-handling can be done by wrapping error-prone operations individually in its own `try catch` block or by conditionals.
- All errors should be routed to the error handler middleware through the `next` function and be handled there.

## Additional Information

- Route handlers preceded by an authentication middleware will have access to `req.user` variable which corresponds to the currently logged user.


