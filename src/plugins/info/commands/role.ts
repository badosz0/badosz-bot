import { Command, Command_output } from "../../../structures/command";

export = new Command ({
    trigger : "role",
    developer: false,
    usage: "<mention/id/name>",
    output : async ({message, args = []}: Command_output) => 
    {
        let role = message.mentions.roles.first()
        if (!role) role = message.guild.roles.find(role => role.name === args.join(' '))
        if (!role) role = message.guild.roles.find(role => role.id === args.join(' '))
        if (!role) 
        {
            return false
        }
        
        return {
            text: `**Name:** ${role.name}\n` +
                  `**ID:** ${role.id}\n` +
                  `**Members:** ${role.members.size}\n` +
                  `**Position:** ${role.position}\n` +
                  `**Hoisted:** ${role.hoist ? 'Yes' : 'No'}\n` +
                  `**External:** ${role.managed ? 'Yes' : 'No'}\n` +
                  `**Mentionable:** ${role.mentionable ? 'Yes' : 'No'}\n` +
                  `**Created At:** ${role.createdAt.toUTCString()}\n`,
            thumbnail: `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`
        }
    }
})