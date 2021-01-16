import { GuildChannel } from "discord.js"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "unlock",
    user_perms: ["MANAGE_GUILD", "MANAGE_ROLES", "MANAGE_CHANNELS"],
    bot_perms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    output: async ({message}: CommandInput) => {
        const channel = message.guild?.channels.cache.get(message.channel.id) as GuildChannel

        if (channel) {
            await channel.overwritePermissions([{
                id: message.guild?.id as string,
                allow: [
                    "SEND_MESSAGES",
                    "ADD_REACTIONS"
                ], 

            }], "")

            message.delete()

            return {
                message: ":lock:`Channel unlocked.`"
            }
        } else {
            return false
        }
        
    }
})