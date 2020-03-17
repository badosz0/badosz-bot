import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "ping",
    output : ({message}: Command_output) => 
    {
        return {
            text: `Api: **${Math.floor(core.ping)}ms.** | Bot: **${Date.now() - message.createdTimestamp}ms.**`
        }
    }
})