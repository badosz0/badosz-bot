import rethinkdb from "rethinkdb";
import { log } from "../utils/logger";
import { Settings } from "../";

export let connection: rethinkdb.Connection | void = undefined;

export async function connect(settings: Settings): Promise<void> {
    try {
        connection = await rethinkdb.connect(settings.database);
        log("info", "Connected to database.");
    } catch (e) {
        log("error", `Error while connecting to database: ${e}`);
        process.exit();
    }
}
