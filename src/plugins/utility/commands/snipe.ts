import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "snipe",
    output : ({message}: Command_output) => 
    {
        if (!core.cache.guilds[message.guild.id] || !core.cache.guilds[message.guild.id].snipe.message)
        {
            return {
                text: "No snipes in this server.",
                error: true
            }
        }
        else
        {
            const snipe = core.cache.guilds[message.guild.id].snipe
            return {
                text: snipe.message.content,
                author: [snipe.message.author.tag, snipe.message.author.displayAvatarURL],
                image: snipe.image
            }
        }
    }
})