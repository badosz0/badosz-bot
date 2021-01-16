import { Command, CommandInput } from "../../../structures/command"
import { core } from "../../../index"
import { Util } from "discord.js"
import twemoji from "twemoji"

export = new Command ({
    trigger : "emoji",
    developer: false,
    usage: "<emoji>",
    output: async ({args = []}: CommandInput) => {
        if (!args[0]) {
            return false
        }

        const discord_emoji = Util.parseEmoji(args[0])
        const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/)
        
        let emoji
        let url = ""
        let name = "*unknown*"
        let guild = "*unknown*"
        let id = "*unknown*"
        
        if (match && match[1]) {
            emoji = core.emojis.cache.get(match[1]) || emoji
        }
        
        if (discord_emoji?.animated) {
            url = `https://cdn.discordapp.com/emojis/${discord_emoji.id}.gif?v=1`
        } else if (!discord_emoji?.id) {
            const twemoji_data = twemoji.parse(args[0])
            const regex = /src="(.+)"/
            const link = regex.exec(twemoji_data) || url
            url = link[1]
        } else {
            url = `https://cdn.discordapp.com/emojis/${discord_emoji.id}.png`
        }
        name = discord_emoji?.name || name
        guild = emoji ? emoji.guild.name : guild
        id = discord_emoji?.id || id

        return {
            fields: [
                {
                    title: "Name",
                    text: name,
                    inline: true
                },
                {
                    title: "Guild",
                    text: guild,
                    inline: true
                },
                {title: "blank"},
                {
                    title: "ID",
                    text: id,
                    inline: true
                },
                {
                    title: "Url",
                    text: `[[link]](${url})`,
                    inline: true
                }
            ],
            thumbnail: url
        }
    }
})