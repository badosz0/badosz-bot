import { GuildChannel } from "discord.js"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "lock",
    user_perms: ["MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_CHANNELS"],
    bot_perms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    usage: "[reason]",
    output: async ({message, args = []}: CommandInput) => {
        const channel = message.guild?.channels.cache.get(message.channel.id) as GuildChannel
        const reason = args.join(" ")

        if (channel) {
            await channel.overwritePermissions([{
                id: message.guild?.id as string,
                deny: [
                    "SEND_MESSAGES",
                    "ADD_REACTIONS"
                ],

            }], `${reason ? `**Reason:** ${reason}` : ""}`)

            message.delete()

            return {
                message: `:lock:\`Channel locked.\`\n${reason ? `**Reason:** ${reason}` : ""}`
            }
        } else {
            return false
        }
        
    }
})