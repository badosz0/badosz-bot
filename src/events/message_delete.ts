import { Message } from "discord.js";
import { core } from "../index";

export async function run(message: Message): Promise<void> {
    try {
        let img;
        if (message.attachments.array()[0]) {
            img = message.attachments.array()[0].url;
        }
        if (!core.cache[message.guild?.id as string]) {
            core.cache[message.guild?.id as string] = {
                snipe: {},
            };
        }
        core.cache[message.guild?.id as string].snipe = {
            message: message,
            img: img,
            time: Date.now(),
        };
    } catch (e) {
        // eslint-disable-next-line no-empty
    }
}
