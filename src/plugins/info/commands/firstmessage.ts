import { Message } from "discord.js"
import { Command, CommandInput } from "../../../structures/command"

export = new Command ({
    trigger : "firstmessage",
    developer: false,
    output: async ({message}: CommandInput) => {
        const messages = await message.channel.messages.fetch({after: "1", limit: 1})
        const first_message = messages.first() as Message

        return {
            message: `[${first_message.author.tag} said:](${first_message.url})\n ${first_message.content}`,
            thumbnail: first_message.author.displayAvatarURL(),
            footer: `ID: ${first_message.id}`
        }
    }
})