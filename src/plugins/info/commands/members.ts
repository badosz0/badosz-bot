import { Text_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";
import { Message } from "discord.js";

function by_status(message: Message, status: string, total: number) : string
{
    const count =  message.guild.members.filter(m => m.presence.status == status && !m.user.bot).size
    return `\`${Math.round(count/total*100)}%\` [ ${count} ]`
}

function by_game(message: Message, games: string[], total: number) : string
{
    let count = 0
    games.forEach(game => 
    {
        count += message.guild.members.filter(m => m.presence.game && m.presence.game.name == game && !m.user.bot).size
    })
    return `\`${Math.round(count/total*100)}%\` [ ${count} ]`
}

function nothing(message: Message, total: number) : string
{
    const count = message.guild.members.filter(m => !m.presence.game && !m.user.bot).size
    return `\`${Math.round(count/total*100)}%\` [ ${count} ]`
}

export = new Text_command ({
    trigger : "members",
    output : ({message}: Command_output) => 
    {
        const total_members = message.guild.members.filter(m => !m.user.bot).size
        
        const members = `**Members (${total_members})**\n` + 
        `<:dcOnline:495281269391884288> ${by_status(message, "online", total_members)} Online\n` +
        `<:dcIdle:495281269253603346>  ${by_status(message, "idle", total_members)} Idle\n` +
        `<:dcDnd:495281269609857024> ${by_status(message, "dnd", total_members)} Dnd\n` +
        `<:dcOffline:495281269379432449> ${by_status(message, "offline", total_members)} Offline\n\n` +

        `:keyboard: ${by_game(message, ["Eclipse IDE", "Sublime Text","PyCharm Professional", "Atom", "Atom Editor", "Visual Studio Code"], total_members)} Programming\n` +
        `:musical_note: ${by_game(message, ["Spotify"], total_members)} Listening to Spotify\n` +
        `:sleeping_accommodation: ${nothing(message, total_members)} Doing Nothing`

        return members
    }
})