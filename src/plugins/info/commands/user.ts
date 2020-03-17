import { Command, Command_output } from "../../../structures/command";
import { get_user } from "../../../utils/user";

export = new Command ({
    trigger : "user",
    developer: false,
    usage: "[mention/id]",
    output : async ({message, args = []}: Command_output) => 
    {
        const user = await get_user(message, args)
        const member = await message.guild.fetchMember(user)

        return {
            text: `**Username:** ${user.tag}\n` +
                  `**Nick:** ${member.nickname ? member.nickname : user.username}\n` +
                  `**Bot:** ${user.bot ? 'Yes' : 'No'}\n` +
                  `**ID:** ${user.id}\n` +
                  `**Status:** ${user.presence.status.replace(/online/g, `Online`)
                                                     .replace(/idle/g, `Idle`)
                                                     .replace(/dnd/g, `Do Not Disturb`)
                                                     .replace(/offline/g, `Offline`)}\n` +
                  `**Muted:** ${member.serverMute ? 'Yes' : 'No'}\n` +
                  `**Color:** ${member.displayHexColor}\n` +
                  `**Highest Role:** ${member.highestRole.name.replace(/@everyone/g, '-')}\n` +
                  `**Joined At:** ${member.joinedAt.toUTCString()}\n` +
                  `**Created At:** ${user.createdAt.toUTCString()}\n`,
            thumbnail: user.displayAvatarURL
        }
    }
})