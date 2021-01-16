import { PermissionString } from "discord.js"
import { emojis } from "../../../constants"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "perms",
    output: ({message}: CommandInput) => {
        const bot_permissions = message?.guild?.me?.permissions.serialize()
        
        let perms = ""
        for (const perm in bot_permissions) {
            perms += `${bot_permissions[perm as PermissionString] ? emojis.yes : emojis.no}\`${perm.replace(/_/g, " ")}\`\n`
        }

        return {
            message: `${message?.guild?.me} permissions in \`${message?.guild?.name}\`\n\n${perms}`
        }
    }
})