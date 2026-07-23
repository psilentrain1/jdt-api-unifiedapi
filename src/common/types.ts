import express from "express";

export type CrudHandlers = {
  getAll: express.RequestHandler;
  getOne: express.RequestHandler;
  add: express.RequestHandler;
  update: express.RequestHandler;
  delete: express.RequestHandler;
};
