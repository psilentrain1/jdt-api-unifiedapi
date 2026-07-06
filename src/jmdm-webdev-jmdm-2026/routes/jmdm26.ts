import express from "express";
import * as Sentry from "@sentry/node";
import * as db from "../controllers/jmdm26.js";
import { requireSession } from "../../middleware/authMiddleware.js";
import { logger } from "../../services/logging.js";

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

  r.get("/", async (req, res, next) => {
    log.trace(`GET /${resource}`);
    Sentry.logger.trace(`GET /${resource}`, {
      module: "JMDM26 Routes",
    });
    handlers.getAll(req, res, next);
  });
  r.post("/", requireSession, async (req, res, next) => {
    log.trace(`POST /${resource}`);
    Sentry.logger.trace(`POST /${resource}`, {
      module: "JMDM26 Routes",
    });
    handlers.add(req, res, next);
  });
  r.get("/:id", async (req, res, next) => {
    log.trace(`GET /${resource}/:id`);
    Sentry.logger.trace(`GET /${resource}/:id`, {
      module: "JMDM26 Routes",
    });
    handlers.getOne(req, res, next);
  });
  r.put("/:id", requireSession, async (req, res, next) => {
    log.trace(`PUT /${resource}/:id`);
    Sentry.logger.trace(`PUT /${resource}/:id`, {
      module: "JMDM26 Routes",
    });
    handlers.update(req, res, next);
  });
  r.delete("/:id", requireSession, async (req, res, next) => {
    log.trace(`DELETE /${resource}/:id`);
    Sentry.logger.trace(`DELETE /${resource}/:id`, {
      module: "JMDM26 Routes",
    });
    handlers.delete(req, res, next);
  });

  return r;
}

router.get("/", (req, res) => {
  log.trace("GET /");
  Sentry.logger.trace(`GET /`, {
    module: "JMDM26 Routes",
  });
  res.status(400).send("Bad Request");
});

router.get("/site", async (req, res) => {
  log.trace("GET /site");
  Sentry.logger.trace(`GET /site`, {
    module: "JMDM26 Routes",
  });
  res.send(await db.getSiteSettings());
});

router.put("/site", requireSession, async (req, res) => {
  log.trace("PUT /site");
  Sentry.logger.trace(`PUT /site`, {
    module: "JMDM26 Routes",
  });
  if (await db.updateSiteSettings(req.body)) {
    res.status(200).json({ message: "Settings updated successfully." });
  } else {
    res.status(400).json({ message: "Error updating settings." });
  }
});

router.get("/resume", async (req, res) => {
  log.trace("GET /resume");
  Sentry.logger.trace(`GET /resume`, {
    module: "JMDM26 Routes",
  });
  res.send(await db.getResumeInfo());
});

router.put("/resume", requireSession, async (req, res) => {
  log.trace("PUT /resume");
  Sentry.logger.trace(`PUT /resume`, {
    module: "JMDM26 Routes",
  });
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
