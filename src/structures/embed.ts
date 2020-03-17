import { Message, RichEmbed } from "discord.js";

export interface Embed_options
{
    object: Message;
    message: string;
    image?: string;
    thumbnail?: string;
    color?: string;
    author?: string[];
}

export class Embed
{
    public object: Message;
    public message: string;
    public image: string;
    public thumbnail : string;
    public color : string;
    public author: string[];

    constructor ({object, message, image = "", thumbnail = "", color = "#ffe680", author = ["", ""]}: Embed_options)
    {
        this.object = object;
        this.message = message;
        this.image = image;
        this.thumbnail = thumbnail;
        this.color = color;
        this.author = author;
    }

    send(): void {

        const embed = new RichEmbed()
            .setDescription(this.message)
            .setImage(this.image)
            .setThumbnail(this.thumbnail)
            .setColor(this.color)
            .setAuthor(this.author[0], this.author[1])
            
        this.object.channel.send("", { embed })
    };

}