import { Command, Command_output } from "../../../structures/command";
import { get_user } from "../../../utils/user";

export = new Command ({
    trigger : "ban",
    user_perms: ["BAN_MEMBERS"],
    bot_perms: ["BAN_MEMBERS"],
    usage: "<mention/id>",
    output : async ({message, args = []}: Command_output) => 
    {
        const user = await get_user(message, args, false)

        if (args.length == 0)
        {
            return false
        }

        if (!user)
        {
            return {text: `**This user does not exist.**`, error: true}
        }

        const member = message.guild.members.get(user.id)
        
        if (member)
        {
            if (member.id == message.author.id)
            {
                return {text: `**You can not ban yourself.**`, error: true}
            }
    
            if (!member.bannable)
            {
                return {text: `**You can not ban ${user.tag}.**`, error: true}
            }
    
            const reason = args.slice(1).join(" ")
            try 
            {
                const tag = member.user.tag
                const avatar = member.user.displayAvatarURL
    
                member.ban(`Banned by ${message.author.tag}.\nReason: ${reason ? reason : "not specified."}`)
                return {
                    text : `**Reason: **${reason ? reason : "not specified."}`,
                    author : [`${tag} has been banned.`, avatar]
                }
            } 
            catch (e)
            {
                return {
                    text : "**I can not ban this user.**",
                    error : true
                }
            }
        }
        else
        {
            return {text: `**This user does not exist in this server.**`, error: true}
        }

        
    }
})