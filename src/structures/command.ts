import { Message } from "discord.js";

export type Trigger = string

export interface Command_output
{
    message: Message;
}


export interface Command_options
{
    trigger: Trigger;
    output: ({message}: Command_output) => any;
}


export abstract class Command
{
    public trigger: Trigger;
    public output: any;

    constructor ({trigger, output}: Command_options)
    {
        this.trigger = trigger;
        this.output = output;
    }

    abstract run(message: Message): void;

}

export class Text_command extends Command
{
    constructor({trigger, output}: Command_options)
    {
        super({trigger, output});
    }

    public run(message: Message) : void {
        message.channel.send(this.output({message}));
    }
}

