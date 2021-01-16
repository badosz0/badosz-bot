import { colors } from "../../../constants"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "invites",
    bot_perms: ["MANAGE_GUILD"],
    output: async ({message}: CommandInput) => {
        const invites =  await message?.guild?.fetchInvites()

        if (!invites || invites.size == 0){
            return {
                message: "No invites found.",
                color: colors.error
            }
        }

        const list = await invites.sort((a, b) => (b.uses || 0) - (a.uses || 0))
            .map(invite => `[**${invite.inviter ? invite.inviter.tag : "unknown"}**](https://discord.gg/${invite.code}) - ${invite.uses} use${invite.uses == 1 ? "" : "s"}`)
            .map((invite, i) => `\`${i + 1}.\` ${invite}`)
            .join("\n")

        return {
            message: `Invites in **${message?.guild?.name}**\n\n${list}`
        }
    }
})