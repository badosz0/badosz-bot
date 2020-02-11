import { Image_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";
import { get_user } from "../../../utils/user";
import { Util } from "discord.js";

const twemoji = require("twemoji")

export = new Image_command ({
    trigger : "emoji",
    developer: false,
    output : async ({message, args = []}: Command_output) => 
    {
        if (!args[0])
        {
            return {text: "Provide a valid emoji."}
        }

        const discord_emoji = Util.parseEmoji(args[0])
        const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/)
        
        let emoji
        let url = ""
        let name = "*unknown*"
        let guild = "*unknown*"
        let id = "*unknown*"
        
        if (match && match[1])
        {
            emoji = core.emojis.get(match[1]) || emoji
        }
        
        if (discord_emoji.animated)
        {
            url = `https://cdn.discordapp.com/emojis/${discord_emoji.id}.gif?v=1`
        }
        else if (!discord_emoji.id)
        {
            const twemoji_data = twemoji.parse(args[0])
            const regex = /src="(.+)"/
            const link = regex.exec(twemoji_data) || url
            url = link[1]
        }
        else
        {
            url = `https://cdn.discordapp.com/emojis/${discord_emoji.id}.png`
        }
        name = discord_emoji.name ? discord_emoji.name : name
        guild = emoji ? emoji.guild.name : guild
        id = discord_emoji.id ? discord_emoji.id : id

        console.log(name, guild, id, url)

        return {
            text: `\`Guild:\` ${guild}\n\`ID:\` ${id}\n\`Url:\` [[link]](${url})`,
            thumbnail: url
        }
    }
})