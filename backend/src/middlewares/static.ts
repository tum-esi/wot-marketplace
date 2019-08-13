import express from 'express';
import { join } from 'path';
import ServeFavicon from 'serve-favicon';

export const initStatic = (app: express.Application) => {
  app.use(ServeFavicon(join(__dirname, "..", "..", "..", "frontend", "dist", "favicon.ico")));
  
  app.use("/public", express.static(
    join(__dirname, "..", "..", "..", "frontend", "dist"),
    { maxAge: 1000 * 60 * 60 * 12 }
  ));

  app.use("/img", express.static(
    join(__dirname, "..", "..", "..", "frontend", "dist", "img"),
    { cacheControl: false }
  ))

  app.use("/js", express.static(
    join(__dirname, "..", "..", "..", "frontend", "dist", "js"),
    { cacheControl: false }
  ));

  app.use("/css", express.static(
    join(__dirname, "..", "..", "..", "frontend", "dist", "css"),
    { cacheControl: false }
  ));
}