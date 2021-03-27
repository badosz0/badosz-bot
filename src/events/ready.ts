import { log } from "../utils/logger";
import { core } from "../index";

export function run(): void {
    (function setPresence() {
        core.user?.setActivity(`${core.prefix}help`, { type: "WATCHING" });
        setTimeout(setPresence, 120000);
    })();
    log("info", `Ready in ${core.guilds.cache.size} guilds.`);
}
