import Winston from "winston";
import Config from "../config/config";

const config = process.env.NODE_ENV === "production" ? Config.production : Config.development;

const logger = Winston.createLogger({
    level: "debug",
    exitOnError: false
});

if (config.logs && config.logs.file) {
    logger.add(new Winston.transports.File({
        format: Winston.format.combine(
            Winston.format.json(),
            Winston.format.timestamp()
        ),
        ...config.logs.file
    }));
};

if (config.logs && config.logs.console) {
    logger.add(new Winston.transports.Console({
        format: Winston.format.cli(),
        ...config.logs.console
    }));
};

export default logger;