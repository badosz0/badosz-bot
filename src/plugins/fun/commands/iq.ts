import { get_user } from "../../../utils/user"
import { Command, CommandInput } from "../../../structures/command"
import { User } from "discord.js"
import { string_value } from "../../../utils/math"
import { developer } from "../../../constants"

export = new Command({
    trigger: "iq",
    usage: "[user]",
    output: async ({message, args = []}: CommandInput) => {
        const user = await get_user(message, args) as User
        
        return {
            message: `${user.username} has ${user.id != developer ? await string_value(user.tag, 200) : 6000} iq.`
        }
    }
})