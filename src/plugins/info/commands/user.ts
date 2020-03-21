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
            fields: [
                {
                    title: "Username",
                    text: user.tag,
                    inline: true
                },
                {
                    title: "Nick",
                    text: member.nickname ? member.nickname : user.username,
                    inline: true
                },
                {
                    title: "ID",
                    text: user.id,
                    inline: true
                },
                {
                    title: "Bot",
                    text: user.bot ? 'Yes' : 'No',
                    inline: true
                },

                {
                    title: "Status",
                    text: user.presence.status.replace(/online/g, `Online`)
                                              .replace(/idle/g, `Idle`)
                                              .replace(/dnd/g, `Do Not Disturb`)
                                              .replace(/offline/g, `Offline`),
                    inline: true
                },
                {
                    title: "Muted",
                    text: member.serverMute ? 'Yes' : 'No',
                    inline: true
                },
                {
                    title: "Deafed",
                    text: member.serverDeaf ? 'Yes' : 'No',
                    inline: true
                },

                {
                    title: "Highest Role",
                    text: member.highestRole.name.replace(/@everyone/g, '-'),
                    inline: true
                },
                {
                    title: "Color",
                    text: member.displayHexColor,
                    inline: true
                },

                {
                    title: "Created At",
                    text: user.createdAt.toUTCString()
                },
                {
                    title: "Joined At",
                    text: member.joinedAt.toUTCString()
                },
            ],
            thumbnail: user.displayAvatarURL
        }
    }
})