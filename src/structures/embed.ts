import { Message, RichEmbed } from "discord.js";

export interface Embed_options
{
    object: Message;
    message: string;
    image?: string;
}

export class Embed
{
    public object: Message;
    public message: string;
    public image: string;

    constructor ({object, message, image = ""}: Embed_options)
    {
        this.object = object;
        this.message = message;
        this.image = image;
    }

    send(): void {

        const embed = new RichEmbed()
            .setDescription(this.message)
            .setImage(this.image)
        
        this.object.channel.send("", { embed })
    };

}