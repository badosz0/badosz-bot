import { Command, CommandInput } from "../../../structures/command"
import { core } from "../../../index"
import { developer } from "../../../constants"

export = new Command ({
    trigger : "help",
    usage: "[command]",
    output: async ({message, args = []}: CommandInput) => {
        if (args[0]) {
            let command: Command | undefined
    
            await core.plugins.forEach(plugin => {
                const command_match = plugin.commands.find((plugin_command: Command) =>
                    plugin_command.data.trigger == args[0].toLowerCase()
                )
                if (command_match) {
                    command = command_match
                }
            })
          
            if (command) {
                return {
                    fields: [
                        {
                            title: "Command",
                            text: command.data.trigger
                        },
                        {
                            title: "Usage",
                            text: `${core.prefix}${command.data.trigger} ${command.data.usage?.replace(/{prefix}/g, core.prefix) || ""}`
                        }
                    ]
                }
            }
    
        }
    
        let help = ""

        core.plugins.forEach(plugin => {
            if ((plugin.id == "dev" && message.author.id != developer)) return

            help += `**${plugin.name}** (${plugin.commands.length})\n` +
                    plugin.commands.map(command => `\`${command.data.trigger}\``).join(", ") + "\n"
        })
    
        return {
            message: help
        }
    }
})