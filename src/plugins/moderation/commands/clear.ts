import { Snowflake, TextChannel, User } from "discord.js"
import { colors } from "../../../constants"
import { Command, CommandInput } from "../../../structures/command"

function correct(n: string): number {
    return Math.min(Math.max(parseInt(n), 1), 100)
}

export = new Command ({
    trigger : "clear",
    user_perms: ["MANAGE_MESSAGES"],
    bot_perms: ["MANAGE_MESSAGES"],
    usage: "all <number of messages> [nolog]\n" +
    "{prefix}clear embeds <number of messages> [nolog]\n" + 
    "{prefix}clear attachments <number of messages> [nolog]\n" +
    "{prefix}clear links <number of messages> [nolog]\n" +
    "{prefix}clear bots <number of messages> [nolog]\n" +
    "{prefix}clear user <mention> <number of messages> [nolog]\n" +
    "{prefix}clear before <message id> [nolog]\n" +
    "{prefix}clear after <message id> [nolog]\n" +
    "{prefix}clear with <word> <number of messages> [nolog]\n" +
    "{prefix}clear without <word> <number of messages> [nolog]\n" +
    "{prefix}clear startswith <word> <number of messages> [nolog]\n" +
    "{prefix}clear endswith <word> <number of messages> [nolog]",
    output: async ({message, args = []}: CommandInput) => {
        return message.delete().then(async () => {
            let messages = (await message.channel.messages.fetch({ limit: 100 })).array()
            let user: User

            if (!args[0]) {
                return false
            }
    
            switch (args[0]) {
                case "all":
                    if (!parseInt(args[1])) return false
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "bots":
                    if (!parseInt(args[1])) return false
                    messages = messages.filter(message => message.author.bot)
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "attachments":
                    if (!parseInt(args[1])) return false
                    messages = messages.filter(message => message.content.includes("http"))
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "embeds":
                    if (!parseInt(args[1])) return false
                    messages = messages.filter(message => message.embeds.length != 0)
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "user":
                    user = message.mentions?.users?.first() as User
                    if (user) {
                        messages = messages.filter(message => message.author.id === user.id)
                    } else {
                        return false
                    }
                    if (!parseInt(args[2])) return false
                    messages = messages.slice(0, correct(args[2]))
                    break
                case "after":
                    if (!message.channel.messages.cache.get(args[1])) return false
                    messages = messages.filter(message => parseInt(message.id) > parseInt(args[1]))
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "before":
                    if (!message.channel.messages.cache.get(args[1])) return false
                    messages = messages.filter(message => parseInt(message.id) < parseInt(args[1]))
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "with":
                    if (!args[1]) return false
                    if (!parseInt(args[2])) return false
                    messages = messages.filter(message => message.content.includes(args[1]))
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "without":
                    if (!args[1]) return false
                    if (!parseInt(args[2])) return false
                    messages = messages.filter(message => !message.content.includes(args[1]))
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "startsWith":
                    if (!args[1]) return false
                    if (!parseInt(args[2])) return false
                    messages = messages.filter(message => message.content.startsWith(args[1]))
                    messages = messages.slice(0, correct(args[1]))
                    break
                case "endsWith":
                    if (!args[1]) return false
                    if (!parseInt(args[2])) return false
                    messages = messages.filter(message => message.content.endsWith(args[1]))
                    messages = messages.slice(0, correct(args[1]))
                    break
                default:
                    return false
            }

            try {
                await (message.channel as TextChannel).bulkDelete(messages)
            } catch (e) {
                return {message: "Can't clear this messages.", color: colors.error}
            }
    
            const deleted: {[id: string]: Snowflake[]} = {}
            let cleared = ""
    
            messages.forEach(message => {
                if (!deleted[message.author.tag]) deleted[message.author.tag] = []
                deleted[message.author.tag].push(message.id)
            })
    
            Object.keys(deleted).forEach(user => {
                cleared += `\`${deleted[user].length}\` message${deleted[user].length == 1 ? "" : "s"} by ${user}\n`
            })
    
            if (args[args.length - 1] != "nolog") {
                return {message: `**${message.author.tag}** has deleted \`${messages.length}\` message${messages.length == 1 ? "" : "s"}\n\n${cleared}`}
            } else {
                return true
            }
        })
        
    }
})