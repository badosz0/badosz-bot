import { TextChannel } from "discord.js";
import { core } from "..";

const events: { [name: string]: string } = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove",
};

export async function run(event: any): Promise<void> {
    if (!events.hasOwnProperty(event.t)) return;
    const { d: data } = event;
    const user = core.users.cache.get(data.user_id);
    const channel = core.channels.cache.get(data.channel_id) as TextChannel;
    if (channel.messages.cache.has(data.message_id) && events[event.t] == "messageReactionAdd") return;
    const message = await channel.messages.fetch(data.message_id);
    const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.cache.get(emojiKey);
    core.emit(events[event.t], reaction, user);
}
