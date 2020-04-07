import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "invites",
    bot_perms: ["MANAGE_GUILD"],
    output : async ({message}: Command_output) => 
    {
        const invites = await (await message.guild.fetchInvites())
                        .sort((a, b) => b.uses - a.uses)
                        .map(invite => `[**${invite.inviter ? invite.inviter.tag : "unknown"}**](https://discord.gg/${invite.code}) - ${invite.uses} use${invite.uses == 1 ? "" : "s"}`)
                        .map((invite, i) => `\`${i + 1}.\` ${invite}`)
                        .join("\n")
        return {
            text: `Invites in **${message.guild.name}**\n\n${invites}`
        }
    }
})