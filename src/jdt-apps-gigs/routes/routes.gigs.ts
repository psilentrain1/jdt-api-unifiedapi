import express from "express";
import * as Sentry from "@sentry/node";
import * as db from "../controllers/controllers.gigs.js";
import { requireSession } from "../../middleware/authMiddleware.js";
import { logger } from "../../services/logging.js";
import type { CrudHandlers } from "../../common/types.js";

const log = logger.child({ module: "Gigs Routes" });

export const router = express.Router();

function createCrudRoutes(
  resource: string,
  handlers: CrudHandlers,
): express.Router {
  const r = express.Router();

  r.get("/", async (req, res, next) => {
    log.trace(`GET /${resource}`);
    Sentry.logger.trace(`GET /${resource}`, {
      module: "Gigs Routes",
    });
    await handlers.getAll(req, res, next);
  });
  r.post("/", requireSession, async (req, res, next) => {
    log.trace(`POST /${resource}`);
    Sentry.logger.trace(`POST /${resource}`, {
      module: "Gigs Routes",
    });
    await handlers.add(req, res, next);
  });
  r.get("/:id", async (req, res, next) => {
    log.trace(`GET /${resource}/:id`);
    Sentry.logger.trace(`GET /${resource}/:id`, {
      module: "Gigs Routes",
    });
    await handlers.getOne(req, res, next);
  });
  r.put("/:id", requireSession, async (req, res, next) => {
    log.trace(`PUT /${resource}/:id`);
    Sentry.logger.trace(`PUT /${resource}/:id`, {
      module: "Gigs Routes",
    });
    await handlers.update(req, res, next);
  });
  r.delete("/:id", requireSession, async (req, res, next) => {
    log.trace(`DELETE /${resource}/:id`);
    Sentry.logger.trace(`DELETE /${resource}/:id`, {
      module: "Gigs Routes",
    });
    await handlers.delete(req, res, next);
  });

  return r;
}

router.get("/", (req, res) => {
  log.trace("GET /");
  Sentry.logger.trace("Get /", {
    module: "Gigs Routes",
  });
  res.status(400).send("Bad Request");
});

// TODO: Audit these routes.
// Some will need to be deleted and some will need to be added
router.use(
  "/profile",
  createCrudRoutes("profile", {
    getAll: db.getAllProfiles,
    getOne: db.getProfile,
    add: db.addProfile,
    update: db.updateProfile,
    delete: db.deleteProfile,
  }),
);

router.use(
  "/setting",
  createCrudRoutes("setting", {
    getAll: db.getAllSettings,
    getOne: db.getSetting,
    add: db.addSetting,
    update: db.updateSetting,
    delete: db.deleteSetting,
  }),
);

router.use(
  "/business",
  createCrudRoutes("business", {
    getAll: db.getAllBusinesses,
    getOne: db.getBusiness,
    add: db.addBusiness,
    update: db.updateBusiness,
    delete: db.deleteBusiness,
  }),
);

router.use(
  "/gig",
  createCrudRoutes("gig", {
    getAll: db.getAllGigs,
    getOne: db.getGig,
    add: db.addGig,
    update: db.updateGig,
    delete: db.deleteGig,
  }),
);

router.use(
  "/note",
  createCrudRoutes("note", {
    getAll: db.getAllNotes,
    getOne: db.getNote,
    add: db.addNote,
    update: db.updateNote,
    delete: db.deleteNote,
  }),
);

router.use(
  "/invoice",
  createCrudRoutes("invoice", {
    getAll: db.getAllInvoices,
    getOne: db.getInvoice,
    add: db.addInvoice,
    update: db.updateInvoice,
    delete: db.deleteInvoice,
  }),
);

router.use(
  "/transaction",
  createCrudRoutes("transaction", {
    getAll: db.getAllTransactions,
    getOne: db.getTransaction,
    add: db.addTransaction,
    update: db.updateTransaction,
    delete: db.deleteTransaction,
  }),
);

router.use(
  "/contact",
  createCrudRoutes("contact", {
    getAll: db.getAllContacts,
    getOne: db.getContact,
    add: db.addContact,
    update: db.updateContact,
    delete: db.deleteContact,
  }),
);

router.use(
  "/event",
  createCrudRoutes("event", {
    getAll: db.getAllEvents,
    getOne: db.getEvent,
    add: db.addEvent,
    update: db.updateEvent,
    delete: db.deleteEvent,
  }),
);

router.use(
  "/reminder",
  createCrudRoutes("reminder", {
    getAll: db.getAllReminders,
    getOne: db.getReminder,
    add: db.addReminder,
    update: db.updateReminder,
    delete: db.deleteReminder,
  }),
);

router.use(
  "/document",
  createCrudRoutes("document", {
    getAll: db.getAllDocuments,
    getOne: db.getDocument,
    add: db.addDocument,
    update: db.updateDocument,
    delete: db.deleteDocument,
  }),
);

router.use(
  "/template",
  createCrudRoutes("template", {
    getAll: db.getAllTemplates,
    getOne: db.getTemplate,
    add: db.addTemplate,
    update: db.updateTemplate,
    delete: db.deleteTemplate,
  }),
);
