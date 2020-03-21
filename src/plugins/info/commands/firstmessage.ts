import { Command, Command_output } from "../../../structures/command";

export = new Command ({
    trigger : "firstmessage",
    developer: false,
    output : async ({message, args = []}: Command_output) => 
    {    
        const messages = await message.channel.fetchMessages({after: "1", limit: 1})
        const first_message = messages.first()

        return {
            text: `[${first_message.author.tag} said:](${first_message.url})\n ${first_message.content}`,
            thumbnail: first_message.author.displayAvatarURL,
            footer: `ID: ${first_message.id}`
        }
    }
})