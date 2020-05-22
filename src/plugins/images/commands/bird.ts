import { Command, Command_output } from "../../../structures/command"
import { get_api } from "../../../utils/api"

export = new Command ({
    trigger : "bird",
    output : async () => 
    {
        return {
            attachment: await (await get_api("bird")).buffer(),
            footer: "api.badosz.com"
        }
    }
})