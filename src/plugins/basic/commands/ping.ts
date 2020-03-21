import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "ping",
    output : ({message}: Command_output) => 
    {
        return {
            fields: [
                {
                    title: "Api",
                    text: `${Math.floor(core.ping)}ms`,
                    inline: true
                },
                {
                    title: "Bot",
                    text: `${Date.now() - message.createdTimestamp}ms`,
                    inline: true
                }
            ]
        }
    }
})