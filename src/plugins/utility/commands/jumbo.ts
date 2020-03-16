import { Image_command, Command_output } from "../../../structures/command";
import { Util } from "discord.js";

const twemoji = require("twemoji")

export = new Image_command ({
    trigger : "jumbo",
    usage: "<emoji>",
    output : ({message, args = []}: Command_output) => 
    {
        try
        {
            const emoji = Util.parseEmoji(args[0])
            let url

            if (emoji.animated)
            {
                url = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?v=1`
            }
            else if (!emoji.id)
            {
                const twemoji_data = twemoji.parse(args[0])
                const regex = /src="(.+)"/.exec(twemoji_data) || twemoji_data
                url = regex[1]
            }
            else
            {
                url = `https://cdn.discordapp.com/emojis/${emoji.id}.png`
            }
            
            return {
                text: "",
                image: url
            }
        }
        catch (e)
        {
            return false
        }
    }
})