import { Command, CommandInput } from "../../../structures/command";
import { SnowflakeUtil } from "discord.js";

export = new Command({
    trigger: "snowflake",
    usage: "<snowflake>",
    output: ({ args = [] }: CommandInput) => {
        if (!/^([0-9]{15,21})$/i.exec(args[0])) {
            return false;
        }

        const snowflake = SnowflakeUtil.deconstruct(args[0]);

        return {
            message:
                `**${args[0]}**\n` +
                `**Created at:** ${new Date(snowflake.timestamp).toUTCString()}\n` +
                `**Worker ID:** ${snowflake.workerID}\n` +
                `**Process ID:** ${snowflake.processID}\n` +
                `**Increment:** ${snowflake.increment}`,
        };
    },
});
