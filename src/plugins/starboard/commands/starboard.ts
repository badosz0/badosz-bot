import { Util } from "discord.js";
import { colors } from "../../../constants";
import get_guild from "../../../database/get_guild";
import update_guild from "../../../database/update_guild";
import { core } from "../../../index";
import { Command, CommandInput } from "../../../structures/command";

export = new Command({
    trigger: "starboard",
    user_perms: ["MANAGE_MESSAGES"],
    usage:
        "\n" +
        "{prefix}starboard channel <#channel>\n" +
        "{prefix}starboard emoji <emoji>\n" +
        "{prefix}starboard stars <1-10>",
    output: async ({ args, message }: CommandInput) => {
        const guild = await get_guild(message.guild!.id);
        const channel = message.guild!.channels.cache.get(guild.starboard.channel);

        if (args && args.length >= 2) {
            switch (args[0]) {
                case "channel":
                    if (args[1].startsWith("<#") && args[1].endsWith(">")) {
                        const id = args[1].replace(/[<#>]/g, "");
                        let channel;
                        if (message.guild!.channels.cache.has(id)) {
                            channel = message.guild!.channels.cache.get(id)?.id;
                        } else {
                            channel = message.guild!.channels.cache.get(args[2])?.id;
                        }
                        if (channel) {
                            guild.starboard.channel = channel;
                            await update_guild(guild);
                            return { message: `Channel has been changed to: <#${channel}>` };
                        } else {
                            return {
                                message: "Channel not found.",
                                color: colors.error,
                            };
                        }
                    } else {
                        return false;
                    }
                case "stars":
                    if (/^(1|2|3|4|5|6|7|8|9|10)$/i.test(args[1])) {
                        guild.starboard.reactions = parseInt(args[1]);
                        await update_guild(guild);
                        return { message: `Changed minimum amount of stars to \`${args[1]}\`.` };
                    } else {
                        return false;
                    }
                case "emoji":
                    const emoji = Util.parseEmoji(args[1]);
                    if (emoji?.animated || emoji?.id) {
                        return false;
                    } else if (emoji) {
                        guild.starboard.emoji = emoji.name;
                        await update_guild(guild);
                        return { message: `Changed emoji to ${emoji.name}` };
                    } else {
                        return false;
                    }
                default:
                    return false;
            }
        }

        const info =
            `Channel: ${channel ?? "`none`"}\n` +
            `Reactions required: \`${guild.starboard.reactions}\`\n` +
            `Emoji: ${guild.starboard.emoji}\n\n` +
            `To change channel, type:\n` +
            `\`${core.prefix}starboard channel <#channel>\`\n\n` +
            `To change emoji, type:\n` +
            `\`${core.prefix}starboard emoji <emoji>\`\n\n` +
            `To change amount of stars, type:\n` +
            `\`${core.prefix}starboard stars <1-10>\`\n\n`;

        return {
            message: info,
        };
    },
});
