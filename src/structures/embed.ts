import { Message, RichEmbed } from "discord.js";

export interface Embed_options
{
    object: Message;
    message: string;
}

export class Embed
{
    public object: Message;
    public message: string;

    constructor ({object, message}: Embed_options)
    {
        this.object = object;
        this.message = message;
    }

    send(): void {
        const embed = new RichEmbed()
            .setDescription(this.message)
        
        this.object.channel.send("", { embed })
    };

}