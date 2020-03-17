import { Command, Command_output } from "../../../structures/command";

export = new Command ({
    trigger : "unlock",
    user_perms: ["MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_CHANNELS"],
    bot_perms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    output : async ({message}: Command_output) => 
    {
        const channel = message.guild.channels.get(message.channel.id)

        if (channel)
        {
            await channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
            })

            message.delete()

            return {
                text: `:lock:\`Channel unlocked.\``
            }
        }
        
    }
})