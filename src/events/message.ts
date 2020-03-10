import { Message } from "discord.js"
import { core } from "../index"

export async function run (message: Message) : Promise<void>
{  
    if (message.author.bot) return
    if (!message.guild) return

    if (message.content.startsWith(core.prefix)) 
    {
        return require('../handlers/command').run(message)
    }
}