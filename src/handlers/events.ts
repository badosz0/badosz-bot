import { Bot } from "../index";

const events: {[event_name: string]: string} = {
    ready : "ready",
    message : "message",
    messageDelete : "message_delete"
}

export default class Event_handler 
{
    constructor (bot: Bot)
    {
        Object.keys(events).forEach(event => {
            bot.on(event, require(`../events/${events[event]}`).run);
        })
    }
} 
