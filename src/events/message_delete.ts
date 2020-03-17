import { Message } from "discord.js"
import { core } from "../index"

export async function run (message: Message) : Promise<void>
{  
    try
    {
        let img
        if (message.attachments.array()[0])
        {
            img = message.attachments.array()[0].url
        }
        if (!core.cache.guilds[message.guild.id]) 
        {
            core.cache.guilds[message.guild.id] = {
                snipe: {}
            }
        }
        core.cache.guilds[message.guild.id].snipe = {
            message: message,
            image: img
        }
    }
    catch(e)
    {

    }
}