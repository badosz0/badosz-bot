import { MessageReaction, TextChannel, User } from "discord.js";
import { core } from "..";
import get_guild from "../database/get_guild";

export async function run(reaction: MessageReaction, user: User): Promise<void> {
    if (!reaction) return; // animated
    if (!reaction.message.guild) return;
    if (reaction.message.author.id == core.user?.id) return;

    const guild = await get_guild(reaction.message.guild.id);

    if (reaction.emoji.name !== guild.starboard.emoji) return;

    const star_channel = (await core.channels.fetch(guild.plugins.starboard.channel)) as TextChannel;
    if (!star_channel) return;
    // @TODO
}
