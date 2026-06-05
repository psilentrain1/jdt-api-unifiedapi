import { pino, Logger } from "pino";

export const logger: Logger = pino({
  transport: {
    target: "pino/file",
    options: { destination: "../../app.log" },
  },
  level: "info",
});

// export const logger: Logger = pino({ level: "trace" });
