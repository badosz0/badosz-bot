import { Guild, GuildMember } from "discord.js"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "server",
    developer: false,
    usage: "[name/id]",
    output: async ({message, args = []}: CommandInput) => {
        const regions: {[region: string]: string} = {
            "europe":":flag_eu: Europe",
            "eu-central":":flag_eu: Europe",
            "india": ":flag_in: India",
            "brazil":":flag_br: Brazil",
            "hongkong":":flag_hk: Hongkong",
            "japan": ":flag_jp: Japan",
            "russia": ":flag_ru: Russia",
            "singapore": ":flag_sg: Singapore",
            "southafrica":":flag_za: South Africa",
            "sydney": ":flag_au: Sydney",
            "us-central":":flag_us: United States of America",
            "us-east":":flag_us: United States of America",
            "us-south": ":flag_us: United States of America",
            "us-west":":flag_us: United States of America"
        }

        let server = message.client.guilds.cache.get(args[0])
        if (!server) server = message.client.guilds?.cache.find(guild => guild.name === args.join(" "))
        if (!server) server = message.guild as Guild

        return {
            fields: [
                {
                    title: "Name",
                    text: server.name,
                    inline: true
                },
                {
                    title: "Owner",
                    text: server.owner ? (server.owner as GuildMember).user.tag : "-",
                    inline: true
                },
                {
                    title: "ID",
                    text: server.id,
                    inline: true
                },
                {
                    title: "Members",
                    text: server.members.cache.size as unknown as string,
                    inline: true
                },
                {
                    title: "Region",
                    text: regions[server.region],
                    inline: true
                },
                {
                    title: "Verification Level",
                    text: server.verificationLevel.toLowerCase(),
                    inline: true
                },
                {
                    title: "Emojis",
                    text: server.emojis.cache.size as unknown as string,
                    inline: true
                },
                {
                    title: "Text Channels",
                    text: server.channels.cache.filter(channel => channel.type == "text").size as unknown as string,
                    inline: true
                },
                {
                    title: "Voice Channels",
                    text: server.channels.cache.filter(channel => channel.type == "voice").size as unknown as string,
                    inline: true
                },
                {
                    title: "Created At",
                    text: server.createdAt.toUTCString()
                },
            ],
            thumbnail: server.icon ? server.iconURL() as string : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(server.nameAcronym)}`
        }
    }
})