import express from "express";
import * as db from "../controllers/jmdm26";
import { logger } from "../../services/logging";

const log = logger.child({ module: "JMDM26 Routes" });

export const router = express.Router();

type CrudHandlers = {
  getAll: express.RequestHandler;
  add: express.RequestHandler;
  getOne: express.RequestHandler;
  update: express.RequestHandler;
  delete: express.RequestHandler;
};

function createCrudRoutes(
  resource: string,
  handlers: CrudHandlers,
): express.Router {
  const r = express.Router();

  r.get("/", (req, res, next) => {
    log.trace(`GET /${resource}`);
    handlers.getAll(req, res, next);
  });
  r.post("/", (req, res, next) => {
    log.trace(`POST /${resource}`);
    handlers.add(req, res, next);
  });
  r.get("/:id", (req, res, next) => {
    log.trace(`GET /${resource}/:id`);
    handlers.getOne(req, res, next);
  });
  r.put("/:id", (req, res, next) => {
    log.trace(`PUT /${resource}/:id`);
    handlers.update(req, res, next);
  });
  r.delete("/:id", (req, res, next) => {
    log.trace(`DELETE /${resource}/:id`);
    handlers.delete(req, res, next);
  });

  return r;
}

router.get("/", (req, res) => {
  log.trace("GET /");
  res.status(400).send("Bad Request");
});

router.get("/site", async (req, res) => {
  log.trace("GET /site");
  res.send(await db.getSiteSettings());
});

router.put("/site", async (req, res) => {
  log.trace("PUT /site");
  if (await db.updateSiteSettings(req.body)) {
    res.status(200).json({ message: "Settings updated successfully." });
  } else {
    res.status(400).json({ message: "Error updating settings." });
  }
});

router.get("/resume", async (req, res) => {
  log.trace("GET /resume");
  res.send(await db.getResumeInfo());
});

router.put("/resume", async (req, res) => {
  log.trace("PUT /resume");
  if (await db.updateResumeInfo(req.body)) {
    res.status(200).json({ message: "Resume info updated successfully." });
  } else {
    res.status(400).json({ message: "Error updating resume info." });
  }
});

router.use(
  "/credit",
  createCrudRoutes("credit", {
    getAll: db.getAllCredits,
    add: db.addCredit,
    getOne: db.getCredit,
    update: db.updateCredit,
    delete: db.deleteCredit,
  }),
);

router.use(
  "/exp",
  createCrudRoutes("exp", {
    getAll: db.getAllExp,
    add: db.addExp,
    getOne: db.getExp,
    update: db.updateExp,
    delete: db.deleteExp,
  }),
);

router.use(
  "/post",
  createCrudRoutes("post", {
    getAll: db.getAllPosts,
    add: db.addPost,
    getOne: db.getPost,
    update: db.updatePost,
    delete: db.deletePost,
  }),
);
