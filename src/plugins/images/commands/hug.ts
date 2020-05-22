import { Command, Command_output } from "../../../structures/command"
import { get_api } from "../../../utils/api"

export = new Command ({
    trigger : "hug",
    output : async () => 
    {
        return {
            attachment: await (await get_api("hug")).buffer(),
            footer: "api.badosz.com"
        }
    }
})