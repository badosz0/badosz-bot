import { Text_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Text_command ({
    trigger : "help",
    output : ({message}: Command_output) => 
    {
        let help = ""

        core.plugins.forEach(plugin => {

            help += `**${plugin.name}**\n`
            help += plugin.commands.map((
                command: { 
                    trigger: string; 
                }) => `\`${command.trigger}\``)
                .join(", ")

        })
    
        return help
    }
})