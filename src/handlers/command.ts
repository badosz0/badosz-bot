import { ClientUser, Message, PermissionString } from "discord.js"
import { Command } from "../structures/command"
import { core } from "../index"
import { whitelist, colors, developer } from "../constants"
import { Embed } from "../structures/embed"

export async function run_command(message: Message): Promise<void> {
    if (!message.guild) return
    
    const [command_name, ...args] = message.content.slice(core.prefix.length).split(/ +/g)

    let command: Command | undefined

    await core.plugins.forEach(plugin => {
        const command_match = plugin.commands.find((plugin_command: Command) =>
            plugin_command.data.trigger == command_name.toLowerCase()
        )
        if (command_match) {
            command = command_match
        }
    })

    if (!command) return

    if (!whitelist.includes(message.guild.id)) {
        return new Embed(message, {
            message: 
            `This server is \`not whitelisted\`.

            Visit this [discord server](https://discord.gg/badosz) for more details.`,
            color: colors.error
        }).send()
    }

    if (command.data.developer && message.author.id != developer) {
        return new Embed(message, {
            message: "This command is for developers only.",
            color: colors.error
        }).send()
    }

    const user = message.guild.members.cache.get(message.author.id) 
    const bot = message.guild.members.cache.get((core.user as ClientUser).id)

    if (user) {
        if (command.data.user_perms?.some((perm: PermissionString) => !user.permissions.has(perm)) && message.author.id != developer)  {
            const perm = command.data.user_perms.filter((perm: PermissionString) => !user.permissions.has(perm))[0]

            return new Embed(message, {
                message: `You need to have **${perm.toLowerCase().replace("_"," ")}** permission to use this command.`,
                color: colors.error
            }).send()
        }
    }

    if (bot) {
        if (command.data.bot_perms?.some((perm: PermissionString) => !bot.permissions.has(perm))) {
            const perm = command.data.bot_perms.filter((perm: PermissionString) => !bot.permissions.has(perm))[0]

            return new Embed(message, {
                message: `${core.user} doesn't have **${perm.toLowerCase().replace("_"," ")}** permission.`,
                color: "#f44262"
            }).send()
        }
    }
    
    command.run(message, args)
}