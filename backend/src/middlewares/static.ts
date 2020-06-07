import express from 'express';
import { join } from 'path';

/**
 * Handles serving of static assets by server
 *
 * @param app
 */
export const initStatic = (app: express.Application) => {
  app.use("/", express.static(
      join(__dirname, "..", "..", "..", "frontend", "src", "assets", "icons")
  ));

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
