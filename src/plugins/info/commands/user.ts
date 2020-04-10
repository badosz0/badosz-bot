import { Command, Command_output } from "../../../structures/command"
import { get_user } from "../../../utils/user"
const fetch = require('node-fetch')

function is_bit_set(val: number, pos: number) : boolean {
    return (val & (1 << pos)) != 0
}

const badges: {[bit: number]: string} = {
    0: "<:badgeStaff:698151519723323392>",
    1: "<:badgePartner:698147485486546995>",
    2: "<:hypeSquad:495281269337227275>",
    3: "<:badgeBugHunter:698151487091507231>",
    6: "<:hypeBravery:495281268888698901>",
    7: "<:hypeBrilliance:495281269157003265>",
    8: "<:hypeBalance:495281269249146920>",
    9: "<:badgeSupporter:698151462278135869>",
    14: "<:badgeBugHunter:698151487091507231>"
}

export = new Command ({
    trigger : "user",
    developer: false,
    usage: "[mention/id]",
    output : async ({message, args = []}: Command_output) => 
    {
        const user = await get_user(message, args)
        const member = await message.guild.fetchMember(user)

        const profile = await fetch(`https://discordapp.com/api/v7/users/${user.id}`, {
            method: "Get", 
             headers: { 'Authorization': `Bot ${message.client.token}`}
        }).then((res: any)=> res.json())

        const flags = profile.public_flags

        let user_badges = ""
    
        Object.keys(badges).forEach(badge => {
            if (is_bit_set(flags, parseInt(badge))) user_badges += `${badges[parseInt(badge)]} `
        })

        const support = await message.client.guilds.get("340947847728070666")
        const dt =      await message.client.guilds.get("466179424291651614")
        const emojis =  await message.client.guilds.get("473959011557965835")

        if (support && support.members.get(user.id)) user_badges += `<:badosz:434830069416984596> `
        if (dt && dt.members.get(user.id))           user_badges += `<:salio_desire:467000544259735563> `
        if (emojis && emojis.members.get(user.id))   user_badges += `:smile:`

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
                {
                    title: "Badges",
                    text: user_badges
                },
            ],
            thumbnail: user.displayAvatarURL
        }
    }
})