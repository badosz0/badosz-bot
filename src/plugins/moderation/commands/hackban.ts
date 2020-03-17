import { Command, Command_output } from "../../../structures/command";
import { get_user } from "../../../utils/user";

export = new Command ({
    trigger : "hackban",
    user_perms: ["BAN_MEMBERS"],
    bot_perms: ["BAN_MEMBERS"],
    usage: "<id>",
    output : async ({message, args = []}: Command_output) => 
    {
        if (args.length == 0)
        {
            return false
        }
        
        if (args[0] == message.author.id)
        {
            return {text: `**You can not ban yourself.**`, error: true}
        }

        const reason = args.slice(1).join(" ")
        try 
        {
            message.guild.ban(args[0], {reason: `Banned by ${message.author.tag}.\nReason: ${reason ? reason : "not specified."}`})
            return {
                text : `**Reason: **${reason ? reason : "not specified."}`,
                author : [`${args[0]} has been banned.`, ""]
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
})