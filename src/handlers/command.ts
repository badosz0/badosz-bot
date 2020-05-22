import { Message, PermissionResolvable, TextChannel } from "discord.js"
import { core } from "../index"
import { Command } from "../structures/command";
import { Embed } from "../structures/embed";

const whitelist = require("./whitelist")
const blacklist = require("../../config/blacklist.json")
const logs = require("../../config/logs.json")

export async function run (message: Message) : Promise<void>
{  
    const [command_name, ...args] = message.content.slice(core.prefix.length)
                                                   .split(/ +/g);
    
    let command: Command | undefined;
    
    await core.plugins.forEach(plugin => 
    {
    	const command_match = plugin.commands.find((plugin_command: Command) =>
        	plugin_command.trigger == command_name.toLowerCase()
      	);
      	if (command_match) 
      	{
        	command = command_match;
      	}
  
    })
  
    if(!command) return;

    if (command.limit_to.length > 0 && !command.limit_to.includes(message.guild.id)) return

    if (!whitelist.includes(message.guild.id))
    {
        return new Embed({
            object: message,
            message: 
            `This server is \`not whitelisted\`

            Visit this [discord server](https://discord.gg/ZwPfRfp) for more details.`,
            color: "#f44262"
        }).send()
    }

    if (command.nsfw && !(message.channel as TextChannel).nsfw)
    {
        return new Embed({
            object: message,
            message: `This command is only for NSFW channels.`,
            color: "#f44262"
        }).send()
    }

    if (command.developer && message.author.id != core.developer)
    {
        return new Embed({
            object: message,
            message: `This command is for developers only.`,
            color: "#f44262"
        }).send()
    }

    const user = message.guild.members.get(message.author.id) 
    const bot = message.guild.members.get(core.user.id)
  
    if (user)
    {
        if (command.user_perms.some((perm: any) => !user.permissions.has(perm)) && message.author.id != core.developer) 
        {
        const perm = command.user_perms.filter((perm: any) => !user.permissions.has(perm))[0]

            return new Embed({
                object: message,
                message: `You need to have **${perm.toLowerCase().replace(`_`,` `)}** permission to use this command.`,
                color: "#f44262"
            }).send()
        }
    }

    if (bot)
    {
        if (command.bot_perms.some((perm: any) => !bot.permissions.has(perm))) 
        {
        const perm = command.bot_perms.filter((perm: any) => !bot.permissions.has(perm))[0]

            return new Embed({
                object: message,
                message: `${core.user} doesn't have **${perm.toLowerCase().replace(`_`,` `)}** permission.`,
                color: "#f44262"
            }).send()
        }
    }

    if (blacklist.includes(message.author.id))
    {
        return new Embed({
            object: message,
            message: `Sorry, you are permanently banned from using this bot.\n [[Appeal Here]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`,
            color: "#f44262"
        }).send()
    }

    command.run(message, args)
    const log_channel = await message.client.channels.find(ch => ch.id == logs.commands)
    if (!((log_channel): log_channel is TextChannel => log_channel.type === 'text')(log_channel)) return
    if (log_channel) log_channel.send(`<:markNeutral:579295597782237235>**${message.author.tag} (${message.author.id})** in **${message.guild.name}**: ${message.content}`)
}