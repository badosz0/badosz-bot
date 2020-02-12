import { Message } from "discord.js"
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

    if (blacklist.includes(message.author.id))
    {
        return new Embed({
            object: message,
            message: `Sorry, you are permanently banned from using this bot.\n [[Appeal Here]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`
        }).send()
    }

    command.run(message, args);
}