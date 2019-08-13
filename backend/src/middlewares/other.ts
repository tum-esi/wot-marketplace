import { Application } from 'express';

import { join } from 'path';
import ConnectHistoryApiFallback from "connect-history-api-fallback";
import Cors from "cors";

export const initOther = (app: Application) => {
  app.use(Cors());

  app.use(ConnectHistoryApiFallback({
    index: '/',
    verbose: true
  }))
}