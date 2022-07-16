import { Document } from 'mongoose';
/**
 * The possible print status values
 * @typedef {enum} SMSStatus
 * @values 'PENDING', 'ERROR', 'COMPLETE"
 */
 export enum SMSStatus {
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    COMPLETE = 'COMPLETE'
}

/**
 * An inbound SMS
 * @typedef {Object} InboundSMS
 * @property {string} from - The full number the message is from, incl country code
 * @property {string} msg - The raw message text
 * @property {Date} timeStamp - The date/time the message was received by the service
 * @property {Status} status - The print status of the message (PENDING, ERROR, COMPLETE)
 */
export interface InboundSMS extends Document {
    from: string,
    msg: string,
    timeStamp: Date,
    status: SMSStatus
}

export interface RequestError {
    code: Number,
    error: any
}

export interface HealthResponse {
    code: Number,
    dbStatus: string,
    apiStatus: string
}

export interface TwilioSMSResponse {
    ToCountry: string,
    ToState: string,
    SmsMessageSid: string,
    NumMedia: string,
    ToCity: string,
    FromZip: string,
    SmsSid: string,
    FromState: string,
    SmsStatus: string,
    FromCity: string,
    Body: string,
    FromCountry: string,
    To: string,
    ToZip: string,
    NumSegments: string,
    ReferralNumMedia: string,
    MessageSid: string,
    AccountSid: string,
    From: string,
    ApiVersion: string,
}