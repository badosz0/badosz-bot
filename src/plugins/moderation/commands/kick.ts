import { Command, Command_output } from "../../../structures/command";
import { get_user } from "../../../utils/user";

export = new Command ({
    trigger : "kick",
    user_perms: ["KICK_MEMBERS"],
    bot_perms: ["KICK_MEMBERS"],
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
                return {text: `**You can not kick yourself.**`, error: true}
            }
    
            if (!member.kickable)
            {
                return {text: `**You can not kick ${user.tag}.**`, error: true}
            }
    
            const reason = args.slice(1).join(" ")
            try 
            {
                const tag = member.user.tag
                const avatar = member.user.displayAvatarURL
    
                member.kick(`Kicked by ${message.author.tag}.\nReason: ${reason ? reason : "not specified."}`)
                return {
                    text : `**Reason: **${reason ? reason : "not specified."}`,
                    author : [`${tag} has been kicked.`, avatar]
                }
            } 
            catch (e)
            {
                return {
                    text : "**I can not kick this user.**",
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