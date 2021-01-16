import { colors } from "../../../constants"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "hackban",
    user_perms: ["BAN_MEMBERS"],
    bot_perms: ["BAN_MEMBERS"],
    usage: "<id>",
    output: async ({message, args = []}: CommandInput) => {
        if (args.length == 0) {
            return false
        }
        
        if (args[0] == message.author.id) {
            return {text: "**You can not ban yourself.**", color: colors.error}
        }

        const reason = args.slice(1).join(" ")
        try {
            message.guild?.members.ban(args[0], {reason: `Banned by ${message.author.tag}.\nReason: ${reason ? reason : "not specified."}`})
            return {
                text : `**Reason: **${reason ? reason : "not specified."}`,
                author : [`${args[0]} has been banned.`, ""]
            }
        } 
        catch (e) {
            return {
                text : "**I can not ban this user.**", color: colors.error
            }
        }
        
    }
})