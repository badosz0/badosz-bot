import { Command, Command_output } from "../../../structures/command"
import { get_api } from "../../../utils/api"

export = new Command ({
    trigger : "rabbit",
    output : async () => 
    {
        return {
            attachment: await (await get_api("rabbit")).buffer(),
            footer: "api.badosz.com"
        }
    }
})