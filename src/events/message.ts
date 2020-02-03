import { Message } from "discord.js"
import { core } from "../index"
import { Embed } from "../structures/embed"

export async function run (message: Message) : Promise<void>
{  
    if (message.author.bot) return
    if (!message.guild) return

    // handle mike help for few months
    if (message.content.startsWith("m!"))
    {
        return new Embed({
            object: message,
            message: 
            `**Mike is no longer maintained**
            
            Thank you for using Mike! 
            After three years I decided to no longer develop Mike. There is few reasons to it (I will post them on my [blog](https://badosz.com))
            
            **Badosz Bot** is a new bot that is focused on moderation, utils, logs etc. It's also whitelist-only.
            
            There is few ways to get access to all Badosz Bot features:
            \`-\` Have Mike (this bot account) in your server for more than 400 days
            \`-\` Be person I know and __like__
            \`-\` Donate to my patreon
            \`-\` Be member of my server for more than 300 days
            
            Thanks again for using Mike. ~Badosz
            
            Visit this [discord server](https://discord.gg/ZwPfRfp) for more.`
        }).send()
    }

    if (message.content.startsWith(core.prefix)) 
    {
        return require('../handlers/command').run(message)
    }
}