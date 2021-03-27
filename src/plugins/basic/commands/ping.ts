import { core } from "../../../index";
import { Command, CommandInput } from "../../../structures/command";

export = new Command({
    trigger: "ping",
    output: ({ message }: CommandInput) => {
        return {
            fields: [
                {
                    title: "Api",
                    text: `${Math.floor(core.ws.ping)}ms`,
                    inline: true,
                },
                {
                    title: "Bot",
                    text: `${Date.now() - message.createdTimestamp}ms`,
                    inline: true,
                },
            ],
        };
    },
});
