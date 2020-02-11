import { Text_command, Command_output } from "../../../structures/command";

export = new Text_command ({
    trigger : "perms",
    output : ({message}: Command_output) => 
    {
        const bot_permissions = message.guild.me.permissions.serialize()
        
        let perms = ``
        for (let perm in bot_permissions)
        {
            perms += `${perm ? "<:markYes:568830907666923525>" : "<:markNo:568830953938616330>"}\`${perm.replace(/_/g, ' ')}\`\n`
        }

        return `${message.guild.me} permissions in \`${message.guild.name}\`\n\n${perms}`
    }
})