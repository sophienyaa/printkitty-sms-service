import { model, Schema, Document } from 'mongoose';
import { twilioSMS } from "./sms";
import 'dotenv/config'
import mongoose from "mongoose"
export let database: mongoose.Connection;

/**
 * The possible print status values
 * @typedef {enum} Status
 * @values 'PENDING', 'ERROR', 'COMPLETE"
 */
export enum Status {
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    COMPLETE = 'COMPLETE'
}

/**
 * An inbound SMS
 * @typedef {Object} inboundSMS
 * @property {string} from - The full number the message is from, incl country code
 * @property {string} msg - The raw message text
 * @property {Date} timeStamp - The date/time the message was received by the service
 * @property {Status} status - The print status of the message (PENDING, ERROR, COMPLETE)
 */
interface inboundSMS extends Document {
    from: string
    msg: string
    timeStamp: Date
    status: Status
}
  
/**
 * mongoDB schema for an inbound SMS
 * @typedef {Schema} inboundSMSSchema
 * @property {string} from - The full number the message is from, incl country code
 * @property {string} msg - The raw message text
 * @property {Date} timeStamp - The date/time the message was received by the service
 * @property {Status} status - The print status of the message (PENDING, ERROR, COMPLETE)
 */
const inboundSMSSchema: Schema = new Schema({
    from: { type: String, required: true },
    msg: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    status: { type: String, required: false },
});

/**
 * @type {mongoose.Model<inboundSMS>}
 */
export const InboundSMSModel = model<inboundSMS>("inboundSMS", inboundSMSSchema);

/**
 * Starts a connection to the mongoDB instance
 *
 * @return {void}
 * 
 */
export function connectToDB() {
    // add your own uri below
    if (database) {
      return;
    }
    
    if(process.env.MONGO_DB_URL) {
      mongoose.connect(process.env.MONGO_DB_URL);
    }
    else {
      throw 'No mongoDB url defined, make sure env var MONGO_DB_URL is set'
    }

    database = mongoose.connection;

    database.once("open", async () => {
      console.log("Connected to database");  
    });
    database.on("error", () => {
      console.log("Error connecting to database");
    });
}

/**
 * Ends a connection to the mongoDB instance
 *
 * @return {void}
 * 
 */
export function disconnectFromDB() {
    if (!database) {
      return;
    }
    mongoose.disconnect();
}

/**
 * Stores an incoming SMS in the database
 *
 * @param {twilioSMS} sms - the incoming SMS object
 * @return {inboundSMS} - the saved SMS object with its record id
 *
 */
export async function saveSMSToDB(sms: twilioSMS): Promise<inboundSMS> {
    const isms = new InboundSMSModel({
        from: sms.From,
        msg: sms.Body,
        timeStamp: new Date(),
        status: Status.PENDING
      });
      const res = await isms.save();
      return res
}

/**
 * Gets all SMS records in the DB for the given status
 *
 * @param {string} status - the status of the SMS records to get e.g 'PENDING'
 * @return {Promise<inboundSMS[]>} - a promise to return the matching SMS records
 *
 */
export async function getSMSByStatus(status: string): Promise<inboundSMS[]> {
  const result = await InboundSMSModel.find({ status: status }).exec();
  return result;
}

/**
 * Updates the status of a single SMS record
 *
 * @param {string} id - the ID of the SMS record to update
 * @param {string} status - the status to set e.g 'ERROR'
 * @return {Promise<inboundSMS | null>} - a promise to return the resulting updated record, or not lol
 *
 */
export async function updateSMSRecord(id: string, status: string): Promise<inboundSMS | null> {
  const result = await InboundSMSModel.findByIdAndUpdate(id, {status: status}).exec()
  return result;
}

/**
 * Updates the status of the given SMS records
 *
 * @param {inboundSMS[]} records - the records to update
 * @return {Promise<inboundSMS[] | null>} - a promise to return the resulting updated record, or not lol
 *
 */
export async function updateSMSRecords(records: inboundSMS[]): Promise<inboundSMS[] | null> { //TODO: Implement this
  //InboundSMSModel.updateMany()
  return null;
}
