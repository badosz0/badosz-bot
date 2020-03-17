import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "help",
    usage: `[command]`,
    output : async ({message, args = []}: Command_output) => 
    {

        if (args[0])
        {
            let command: Command | undefined;
    
            await core.plugins.forEach(plugin => 
            {
                const command_match = plugin.commands.find((plugin_command: Command) =>
                    plugin_command.trigger == args[0].toLowerCase()
                  );
                  if (command_match) 
                  {
                    command = command_match;
                  }
          
            })
          
    
            if (command)
            {
                return {
                    text: `**Command: **${command.trigger}\n**Usage: **${core.prefix}${command.trigger} ${command.usage}`
                }
            }
    
        }
    

        let help = ""

        core.plugins.forEach(plugin => {

            if ((plugin.id == "dev" && message.author.id != core.developer) || (plugin.limit_to && !plugin.limit_to.includes(message.guild.id))) return

            help += `**${plugin.name}**\n`
            help += plugin.commands.map((
                command: { 
                    trigger: string; 
                }) => `\`${command.trigger}\``)
                .join(", ")
            help += "\n"
        })
    
        return {
            text: help
        }
    }
})