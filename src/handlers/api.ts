import { Bot } from "../index";
const express = require("express")

export async function init (bot: Bot) : Promise<void> 
{
    const api = express()

    api.get("/emoji/:name", async (req: any, res: any) =>
    {
        const name = req.params.name
        let list: any | never = []
        
        const emojis = bot.emojis.filter(emoji => emoji.name.toLowerCase().includes(name.toLowerCase()))
        
        emojis.forEach(emoji => {
            
            list.push(
                {
                    name : emoji.name,
                    id : emoji.id,
                    animated: emoji.animated,
                    url : `https://cdn.discordapp.com/emojis/${emoji.id}${emoji.animated ? ".gif?v=1" : ".png"}`,
                    discord: `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>`
                }
            )
        
        })

        res.json(list)
    })

    api.listen(bot.api_port)
}