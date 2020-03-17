import { Command, Command_output } from "../../../structures/command";

export = new Command ({
    trigger : "lock",
    user_perms: ["MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_CHANNELS"],
    bot_perms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    usage: "[reason]",
    output : async ({message, args = []}: Command_output) => 
    {
        const channel = message.guild.channels.get(message.channel.id)
        const reason = args.join(" ")

        if (channel)
        {
            await channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })

            message.delete()

            return {
                text: `:lock:\`Channel locked.\`
                ${reason ? `**Reason:** ${reason}` : ``}`
            }
        }
        
    }
})