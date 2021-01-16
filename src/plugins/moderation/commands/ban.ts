import { GuildMember, User } from "discord.js"
import { colors } from "../../../constants"
import { Command, CommandInput } from "../../../structures/command"
import { get_user } from "../../../utils/user"

export = new Command ({
    trigger : "ban",
    user_perms: ["BAN_MEMBERS"],
    bot_perms: ["BAN_MEMBERS"],
    usage: "<mention/id>",
    output: async ({message, args = []}: CommandInput) => {
        const user = await get_user(message, args, false) as User

        if (args.length == 0) {
            return false
        }

        if (!user) {
            return {message: "**This user does not exist.**", color: colors.error}
        }

        const member = message.guild?.members.cache.get(user.id) as GuildMember
        
        if (member){
            if (member.id == message.author.id) {
                return {message: "**You can not ban yourself.**", color: colors.error}
            }
    
            if (!member.bannable) {
                return {message: `**You can not ban ${user.tag}.**`, color: colors.error}
            }
    
            const reason = args.slice(1).join(" ")
            try {
                const tag = member.user.tag
                const avatar = member.user.displayAvatarURL()
    
                member.ban({reason :`Banned by ${message.author.tag}.\nReason: ${reason ? reason : "not specified."}`})
                return {
                    message : `**Reason: **${reason ? reason : "not specified."}`,
                    author : [`${tag} has been banned.`, avatar]
                }
            } 
            catch (e) {
                return {
                    message : "**I can not ban this user.**",
                    color: colors.error
                }
            }
        }
        else {
            return {message: "**This user does not exist in this server.**", color: colors.error}
        }

        
    }
})