import { Message } from "discord.js";
import { Embed } from "./embed";

export type Trigger = string;

export interface Command_output
{
    message: Message;
    args? : string[];
}


export interface Command_options
{
    trigger: Trigger;
    developer?: boolean;
    output: ({message}: Command_output) => any;
}


export abstract class Command
{
    public trigger: Trigger;
    public output: any;
    public developer: boolean;

    constructor ({trigger, output, developer = false}: Command_options)
    {
        this.trigger = trigger;
        this.output = output;
        this.developer = developer;
    }

    abstract run(message: Message, args: string[]): void;

}

export class Text_command extends Command
{
    constructor({trigger, output, developer = false}: Command_options)
    {
        super({trigger, output, developer});
    }

    public run(message: Message, args: string[] = []) : void 
    {
        new Embed({
            object: message,
            message: this.output({message, args})
        }).send()
    }
}

export class Image_command extends Command
{
    constructor({trigger, output, developer = false}: Command_options)
    {
        super({trigger, output, developer});
    }

    public async run(message: Message, args: string[] = []) : Promise<void> 
    {
        const output = await this.output({message, args})
        
        new Embed({
            object: message,
            message: output.text,
            image: output.image
        }).send()
    }
}

