import { Message, RichEmbed } from "discord.js";

export interface Embed_options
{
    object: Message;
    message: string;
    image?: string;
    thumbnail?: string;
}

export class Embed
{
    public object: Message;
    public message: string;
    public image: string;
    public thumbnail : string;

    constructor ({object, message, image = "", thumbnail = ""}: Embed_options)
    {
        this.object = object;
        this.message = message;
        this.image = image;
        this.thumbnail = thumbnail;
    }

    send(): void {

        const embed = new RichEmbed()
            .setDescription(this.message)
            .setImage(this.image)
            .setThumbnail(this.thumbnail)
            .setColor(0x36393f)
            
        this.object.channel.send("", { embed })
    };

}