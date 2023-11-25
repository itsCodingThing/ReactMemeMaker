import pino from "pino";
import prettyPino from "pino-pretty";

const logger = pino(
    process.env.NODE_ENV === "development"
        ? prettyPino({
              colorize: true,
          })
        : undefined
);

export default logger;
