import { Message, RichEmbed, Attachment } from "discord.js";
const imageType = require('image-type')

export interface Embed_options
{
    object: Message;
    message: string;
    image?: string;
    thumbnail?: string;
    color?: string;
    author?: string[];
    attachment?: Buffer
    fields?: any[]
    footer?: string
}

export class Embed
{
    public object: Message;
    public message: string;
    public image: string;
    public thumbnail : string;
    public color : string;
    public author: string[];
    public fields: any[];
    public footer: string;
    public attachment: Buffer

    constructor ({
        object, 
        message, 
        image = "", 
        thumbnail = "", 
        color = "#ffe680", 
        author = ["", ""], 
        fields = [],
        footer = "",
        attachment = new Buffer("")
    }: Embed_options)
    {
        this.object = object;
        this.message = message;
        this.image = image;
        this.thumbnail = thumbnail;
        this.color = color;
        this.author = author;
        this.fields = fields;
        this.footer = footer;
        this.attachment = attachment
    }

    send(): void {


        const embed = new RichEmbed()
            .setDescription(this.message)
            .setImage(this.image)
            .setThumbnail(this.thumbnail)
            .setColor(this.color)
            .setAuthor(this.author[0], this.author[1])
            .setFooter(this.footer)
            this.fields.forEach(field => 
            {                
                field == "blank" ? embed.addBlankField() : embed.addField(field.title, field.text, field.inline)
            })
            
            if (this.attachment.length > 0)
            {
                const type = imageType(this.attachment)
                const file = new Attachment(this.attachment, `file.${type ? type.ext : 'png'}`)
                embed.file = file
                embed.setImage(`attachment://file.${type ? type.ext : 'png'}`)
            }
        this.object.channel.send("", { embed })
    };

}