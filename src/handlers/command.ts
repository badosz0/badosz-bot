import { Message, PermissionResolvable } from "discord.js"
import { core } from "../index"
import { Command } from "../structures/command";
import { Embed } from "../structures/embed";

const whitelist = require("./whitelist")
const blacklist = require("../../config/blacklist.json")

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

            Visit this [discord server](https://discord.gg/ZwPfRfp) for more details.`
        }).send()
    }

    if (command.developer && message.author.id != core.developer)
    {
        return new Embed({
            object: message,
            message: `This command is for developers only.`
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
                message: `You need to have **${perm.toLowerCase().replace(`_`,` `)}** permission to use this command.`
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
                message: `${core.user} doesn't have **${perm.toLowerCase().replace(`_`,` `)}** permission.`
            }).send()
        }
    }

    if (blacklist.includes(message.author.id))
    {
        return new Embed({
            object: message,
            message: `Sorry, you are permanently banned from using this bot.\n [[Appeal Here]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`
        }).send()
    }

    command.run(message, args);
}