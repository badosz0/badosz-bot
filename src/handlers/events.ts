import { Bot } from "../index";

const events: { [event_name: string]: string } = {
    ready: "ready",
    message: "message",
    messageDelete: "message_delete",
};

export function assign_events(bot: Bot): void {
    Object.keys(events).forEach((event) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const func = require(`../events/${events[event]}`);
        bot.on(event, func.run);
    });
}
