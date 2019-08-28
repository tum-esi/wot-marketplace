import { Application } from 'express';

import bodyParser from 'body-parser'; // For parsing of request object 
import ConnectHistoryApiFallback from "connect-history-api-fallback"; // For usage of history mode
import Cors from "cors"; // For resource loading of website by frontend

/**
 * Handles one-line initializations of required middlewares
 * 
 * @param app 
 */
export const initOther = (app: Application) => {
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  
  app.use(Cors());

  app.use(ConnectHistoryApiFallback({
    index: '/',
    verbose: false
  }))
}