import pino from "pino"
import 'dotenv/config'

export const logger = pino({
  name: 'printkitty-sms' ,
  level:process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
  transport: {
    target: 'pino-pretty'
  },
});