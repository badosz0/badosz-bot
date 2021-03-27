import { Command, CommandInput } from "../../../structures/command";
import { core } from "../../../index";
import { colors } from "../../../constants";

export = new Command({
    trigger: "snipe",
    output: ({ message }: CommandInput) => {
        if (!core.cache[message.guild?.id as string]?.snipe.message) {
            return {
                message: "No snipes in this server.",
                color: colors.error,
            };
        } else {
            const snipe = core.cache[message.guild?.id as string].snipe;
            return {
                message: snipe.message?.content,
                author: [snipe.message?.author.tag as string, snipe.message?.author.displayAvatarURL() as string],
                image: snipe.img,
                timestamp: snipe.time,
            };
        }
    },
});
