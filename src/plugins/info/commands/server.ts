import { Image_command, Command_output } from "../../../structures/command";

export = new Image_command ({
    trigger : "server",
    developer: false,
    output : async ({message, args = []}: Command_output) => 
    {
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

        let server = message.client.guilds.get(args[0])
        if (!server) server = message.client.guilds.find(guild => guild.name === args.join(' '))
        if (!server) server = message.guild

        return {
            text: `\`Name:\` ${server.name}\n` +
                  `\`ID:\` ${server.id}\n` +
                  `\`Owner:\` ${server.owner.user.tag}\n` +
                  `\`Members:\` ${server.members.size}\n` +
                  `\`Region:\` ${regions[server.region]}\n` +
                  `\`Text Channels:\` ${server.channels.filter(channel => channel.type == 'text').size}\n` +
                  `\`Voice Channels:\` ${server.channels.filter(channel => channel.type == 'voice').size}\n` +
                  `\`Created At:\` ${server.createdAt.toUTCString()}\n`,
            thumbnail: server.icon ? server.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(server.nameAcronym)}`
        }
    }
})