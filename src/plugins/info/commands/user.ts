import { GuildMember, User } from "discord.js"
import { Command, CommandInput } from "../../../structures/command"
import { get_user } from "../../../utils/user"

export = new Command ({
    trigger : "user",
    developer: false,
    usage: "[mention/id]",
    output: async ({message, args = []}: CommandInput) =>
    {
        const user = await get_user(message, args) as User
        const member = await message.guild?.members.fetch(user) as GuildMember
        
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
                    text: user.bot ? "Yes" : "No",
                    inline: true
                },

                {
                    title: "Status",
                    text: user.presence.status.replace(/online/g, "Online")
                        .replace(/idle/g, "Idle")
                        .replace(/dnd/g, "Do Not Disturb")
                        .replace(/offline/g, "Offline"),
                    inline: true
                },
                {
                    title: "Muted",
                    text: member.voice.serverMute ? "Yes" : "No",
                    inline: true
                },
                {
                    title: "Deafed",
                    text: member.voice.serverDeaf ? "Yes" : "No",
                    inline: true
                },

                {
                    title: "Highest Role",
                    text: member.roles.highest.name.replace(/@everyone/g, "-"),
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
                    text: member.joinedAt?.toUTCString()
                },
            ],
            thumbnail: user.displayAvatarURL()
        }
    }
})