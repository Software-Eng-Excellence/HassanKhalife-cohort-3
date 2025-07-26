import winston, { level } from 'winston';

const logFileFormat = winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.errors({stack: true})
)

const logConsoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: "HH:mm:ss"}),
    winston.format.printf(({timestamp,level, message,stack})=>{
        return `[${timestamp}] ${level}: ${message} ${stack || ""}`;
    })
)

const logger = winston.createLogger({
    level: "info",
    transports:[
        new winston.transports.Console({format:logConsoleFormat}),
        new winston.transports.File({filename:"logs/error.log", level: "error",format: logFileFormat}),
        new winston.transports.File({filename:"logs/all.log",format: logFileFormat})
    ],
    exceptionHandlers:[
        new winston.transports.File({filename:"logs/exceptions.log"})
    ]
})

export default logger;