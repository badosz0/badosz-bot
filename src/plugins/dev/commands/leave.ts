import { core } from "../../..";
import { whitelist } from "../../../constants";
import { Command, CommandInput } from "../../../structures/command";

export = new Command({
    trigger: "leave",
    developer: true,
    output: async ({ args }: CommandInput) => {
        let left = 0;

        for (const guild of core.guilds.cache) {
            if (!whitelist.includes(guild[0])) {
                await guild[1].leave();
                left += 1;
            }
        }

        return { message: `Left ${left} servers that are not whitelisted.` };
    },
});
