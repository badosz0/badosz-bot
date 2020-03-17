import { Command, Command_output } from "../../../structures/command";

export = new Command ({
    trigger : "firstmessage",
    developer: false,
    output : async ({message, args = []}: Command_output) => 
    {    
        const messages = await message.channel.fetchMessages({after: "1", limit: 1})
        const first_message = messages.first()

        return {
            text: `${first_message.author}: ${first_message.content}\n\n[[link]](${first_message.url})\nID: ${first_message.id}`,
            thumbnail: first_message.author.displayAvatarURL
        }
    }
})