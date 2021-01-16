import { Command, CommandInput } from "../../../structures/command"
import { colors } from "../../../constants"

export = new Command ({
    trigger : "roles",
    output: async ({message}: CommandInput) => {
        const roles = await message.guild?.roles.cache
        
        if (!roles || roles.size == 0) {
            return {
                message: "No roles found.",
                color: colors.error
            } 
        }
        
        const list = await roles.filter(role => role.position !== 0)
            .map(role => `**${role.name}** (${role.id})`)
            .map((role, i) => `\`${i + 1}.\` ${role}`)
            .join("\n")

        return {
            message: `Roles in **${message.guild?.name}**\n\n${list}`
        }
    }
})