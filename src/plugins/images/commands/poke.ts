import { Command, Command_output } from "../../../structures/command"
import { get_api } from "../../../utils/api"

export = new Command ({
    trigger : "poke",
    output : async () => 
    {
        return {
            attachment: await (await get_api("poke")).buffer(),
            footer: "api.badosz.com"
        }
    }
})