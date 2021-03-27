import { Command, CommandInput } from "../../../structures/command";
import { Util } from "discord.js";
import twemoji from "twemoji";

export = new Command({
    trigger: "jumbo",
    usage: "<emoji>",
    output: ({ args = [] }: CommandInput) => {
        try {
            const emoji = Util.parseEmoji(args[0]);
            let url;

            if (emoji?.animated) {
                url = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?v=1`;
            } else if (!emoji?.id) {
                const twemoji_data = twemoji.parse(args[0]);
                const regex = /src="(.+)"/.exec(twemoji_data) || twemoji_data;
                url = regex[1];
            } else {
                url = `https://cdn.discordapp.com/emojis/${emoji.id}.png`;
            }

            return {
                message: "",
                image: url,
            };
        } catch (e) {
            return false;
        }
    },
});
