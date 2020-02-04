import { Message } from "discord.js"
import { core } from "../index"
import { Command } from "../structures/command";
import { Embed } from "../structures/embed";

const whitelist = require("./whitelist")

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

    if (!whitelist.includes(message.guild.id))
    {
        return new Embed({
            object: message,
            message: 
            `This server is \`not whitelisted\`

            Visit this [discord server](https://discord.gg/ZwPfRfp) for more details.`
        }).send()
    }

    command.run(message);
}