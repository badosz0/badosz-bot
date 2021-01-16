import { core } from "../index"

export function run(): void {
    console.log("Badosz Bot is ready.");
    (function setPresence() {
        core.user?.setActivity(`${core.prefix}help`, {type: 'WATCHING'})
        setTimeout(setPresence, 120000)
    })()
}