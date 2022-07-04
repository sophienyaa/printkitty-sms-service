import { model, Schema, Document } from 'mongoose';
import { twilioSMS } from "./sms";
import 'dotenv/config'
import mongoose from "mongoose"
let database: mongoose.Connection;

//TODO: make this less gross
export enum Status {
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    COMPLETE = 'COMPLETE'
}

interface inboundSMS extends Document {
    from: string;
    msg: string;
    timeStamp: Date;
    status: Status
}
  
const inboundSMSSchema: Schema = new Schema({
    from: { type: String, required: true },
    msg: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    status: { type: String, required: false },
});

export const InboundSMSModel = model<inboundSMS>("inboundSMS", inboundSMSSchema);

export async function storeInboundSMS(): Promise<void>{

}

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

export function disconnectFromDB() {
    if (!database) {
      return;
    }
    mongoose.disconnect();
}

export async function saveSMSToDB(sms: twilioSMS) {
    const isms = new InboundSMSModel({
        from: sms.From,
        msg: sms.Body,
        timeStamp: new Date(),
        status: Status.PENDING
      });
      const res = await isms.save();
      return res
}

export async function getSMSByStatus(status: string) {
  const result = await InboundSMSModel.find({ status: status }).exec();
  return result;
}

export async function updateSMSRecord(id: string, status: string) {
  const result = await InboundSMSModel.findByIdAndUpdate(id, {status: status}).exec()
  console.log(result);
  return result;
}
