import { Message } from "discord.js";
import { core } from "../index";
import { run_command } from "../handlers/command";

export async function run(message: Message): Promise<void> {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.startsWith(core.prefix)) {
        run_command(message as Message);
    }
}
