import Winston from "winston";
import Config from "../config/config";

const logger = Winston.createLogger({
    level: "debug",
    exitOnError: false
});

if (Config.logs && Config.logs.file) {
    logger.add(new Winston.transports.File({
        format: Winston.format.combine(
            Winston.format.json(),
            Winston.format.timestamp()
        ),
        ...Config.logs.file
    }));
};

if (Config.logs && Config.logs.console) {
    logger.add(new Winston.transports.Console({
        format: Winston.format.cli(),
        ...Config.logs.console
    }));
};

export default logger;