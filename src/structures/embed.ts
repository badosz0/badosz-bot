import { Message, MessageEmbed, MessageAttachment, Constants } from "discord.js";
import imageType from "image-type";

export interface Field {
    title: string;
    text?: string;
    inline?: boolean;
}

export interface EmbedOptions {
    message?: string;
    color?: string;
    image?: string;
    thumbnail?: string;
    author?: string[];
    attachment?: Buffer;
    fields?: Field[];
    footer?: string;
    timestamp?: number;
}

export class Embed {
    public options: EmbedOptions;
    public object: Message;

    constructor(object: Message, options: EmbedOptions) {
        this.options = options;
        this.object = object;
    }

    async send(): Promise<void> {
        const embed = new MessageEmbed()
            .setDescription(this.options.message || "")
            .setColor(this.options.color || Constants.Colors.WHITE - 1)
            .setImage(this.options.image || "")
            .setThumbnail(this.options.thumbnail || "")
            .setAuthor(this.options.author?.[0] || "", this.options.author?.[1])
            .setFooter(this.options.footer || "")
            .setTimestamp(this.options.timestamp);

        this.options.fields?.forEach((field) => {
            field.title == "blank"
                ? embed.addField("\u200b", "\u200b")
                : embed.addField(field.title, field.text, field.inline);
        });

        if (this.options.attachment && this.options.attachment.length > 0) {
            const type = imageType(this.options.attachment);
            const file = new MessageAttachment(this.options.attachment, `x.${type ? type.ext : "png"}`);
            embed.attachFiles([file]);
            embed.setImage(`attachment://x.${type ? type.ext : "png"}`);
        }
        this.object.channel.send({ embed: embed });
    }
}
