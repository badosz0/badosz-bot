import { Text_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Text_command ({
    trigger : "roles",
    output : ({message}: Command_output) => 
    {
        const roles = message.guild.roles.filter(role => role.position !== 0)
                                         .map(role => `**${role.name}** (${role.id})`)
                                         .map((role, i) => `\`${i + 1}.\` ${role}`)
                                         .join("\n")

        return `Roles in \`${message.guild.name}\`\n\n${roles}`
    }
})