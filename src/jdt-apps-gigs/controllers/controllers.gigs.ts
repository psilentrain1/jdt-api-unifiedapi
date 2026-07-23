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

// TODO: Audit these functions.
// Some will need to be deleted and some will need to be added.
export function getAllProfiles() {}

export function getProfile() {}

export function addProfile() {}

export function updateProfile() {}

export function deleteProfile() {}

export function getAllSettings() {}

export function getSetting() {}

export function addSetting() {}

export function updateSetting() {}

export function deleteSetting() {}

export function getAllBusinesses() {}

export function getBusiness() {}

export function addBusiness() {}

export function updateBusiness() {}

export function deleteBusiness() {}

export function getAllGigs() {}

export function getGig() {}

export function addGig() {}

export function updateGig() {}

export function deleteGig() {}

export function getAllNotes() {}

export function getNote() {}

export function addNote() {}

export function updateNote() {}

export function deleteNote() {}

export function getAllInvoices() {}

export function getInvoice() {}

export function addInvoice() {}

export function updateInvoice() {}

export function deleteInvoice() {}

export function getAllTransactions() {}

export function getTransaction() {}

export function addTransaction() {}

export function updateTransaction() {}

export function deleteTransaction() {}

export function getAllContacts() {}

export function getContact() {}

export function addContact() {}

export function updateContact() {}

export function deleteContact() {}

export function getAllEvents() {}

export function getEvent() {}

export function addEvent() {}

export function updateEvent() {}

export function deleteEvent() {}

export function getAllReminders() {}

export function getReminder() {}

export function addReminder() {}

export function updateReminder() {}

export function deleteReminder() {}

export function getAllDocuments() {}

export function getDocument() {}

export function addDocument() {}

export function updateDocument() {}

export function deleteDocument() {}

export function getAllTemplates() {}

export function getTemplate() {}

export function addTemplate() {}

export function updateTemplate() {}

export function deleteTemplate() {}
