/* logging config */
import {createLogger, format, transports} from "winston"
const logger = createLogger({
  level: "debug",
  format:  format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [new transports.Console({ level: 'debug', silent: false }),
               new transports.File({ filename: 'message-service.log' })],
});
 
export { logger as default}
