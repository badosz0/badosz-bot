import { Text_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Text_command ({
    trigger : "ping",
    output : ({message}: Command_output) => 
    {
        return `Api: \`${Math.floor(core.ping)}ms.\` | Bot: \`${Date.now() - message.createdTimestamp}ms.\``
    }
})