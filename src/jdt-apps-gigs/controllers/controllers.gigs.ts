import express from "express";
import * as Sentry from "@sentry/node";
import { client } from "../../services/mongo.js";
import { logger } from "../../services/logging.js";
import { ObjectId } from "mongodb";
import type { WithId } from "mongodb";
import type {
  Profile,
  UserSettings,
  Business,
  Gig,
  Note,
  Invoice,
  Transaction,
  Contact,
  Event,
  Reminder,
  Document,
  Template,
} from "../utils/types.js";
import { getErrorMessage } from "../../common/utils.js";

const log = logger.child({ module: "JMDM26 Controllers" });

function getProfileCollection() {
  return client.db("jdt_apps_gigs").collection<Profile>("profile");
}

function getUserSettingsCollection() {
  return client.db("jdt_apps_gigs").collection<UserSettings>("user_settings");
}

function getBusinessCollection() {
  return client.db("jdt_apps_gigs").collection<Business>("business");
}

function getGigCollection() {
  return client.db("jdt_apps_gigs").collection<Gig>("gig");
}

function getNoteCollection() {
  return client.db("jdt_apps_gigs").collection<Note>("note");
}

function getInvoiceCollection() {
  return client.db("jdt_apps_gigs").collection<Invoice>("invoice");
}

function getTransactionCollection() {
  return client.db("jdt_apps_gigs").collection<Transaction>("transaction");
}

function getContactCollection() {
  return client.db("jdt_apps_gigs").collection<Contact>("contact");
}

function getEventCollection() {
  return client.db("jdt_apps_gigs").collection<Event>("event");
}

function getReminderCollection() {
  return client.db("jdt_apps_gigs").collection<Reminder>("reminder");
}

function getDocumentCollection() {
  return client.db("jdt_apps_gigs").collection<Document>("document");
}

function getTemplateCollection() {
  return client.db("jdt_apps_gigs").collection<Template>("template");
}
