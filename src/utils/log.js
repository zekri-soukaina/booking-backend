import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info", //Define appropriate log levels (error, warn, info, verbose, debug, silly)
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "booking-api" },
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;

// **************************************************************
// *In this setup, winston-daily-rotate-file creates a new log file each day,
// *  compresses them, and retains them for 14 days, ensuring that logs are rotated and old ones are deleted.

// import { createLogger, format, transports } from "winston";
// import DailyRotateFile from "winston-daily-rotate-file";

// // Define transport options for file rotation
// const transportOptions = {
//   filename: "logs/%DATE%-results.log",
//   datePattern: "YYYY-MM-DD",
//   maxSize: "20m", // Maximum size of log file before rotation
//   maxFiles: "14d", // Retain log files for 14 days
// };

// // Create the logger instance
// const logger = createLogger({
//   level: "info", // Minimum log level
//   format: format.combine(
//     format.timestamp(), // Add timestamp to logs
//     format.errors({ stack: true }), // Include stack trace for errors
//     format.splat(), // Enable string interpolation
//     format.json() // Structured logging in JSON format
//   ),
//   defaultMeta: { service: "booking-api" }, // Default metadata for all logs
//   transports: [
//     // Transport for error-level logs
//     new DailyRotateFile({
//       ...transportOptions,
//       level: "error",
//       filename: "logs/error-%DATE%.log",
//     }),
//     // Transport for all other logs
//     new DailyRotateFile(transportOptions),
//   ],
// });

// // Conditional console transport for non-production environments
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new transports.Console({
//       format: format.combine(
//         format.colorize(), // Colorize log levels for console output
//         format.simple() // Simple text format for console output
//       ),
//     })
//   );
// }

// export default logger;

// npm install winston winston-daily-rotate-file
