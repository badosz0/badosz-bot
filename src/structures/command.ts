import { Message } from "discord.js";
import { Embed } from "./embed";
import { core } from "../index";
import user = require("plugins/info/commands/user");

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
    usage?: string;
    limit_to?: string[];
    output: ({message}: Command_output) => any;
    user_perms?: string[];
    bot_perms?: string[];

}


export abstract class Command
{
    public trigger: Trigger;
    public output: any;
    public developer: boolean;
    public usage: string;
    public limit_to: string[];
    public user_perms: string[];
    public bot_perms: string[];

    constructor ({trigger, output, developer = false, limit_to = [], usage = "", user_perms = [], bot_perms = []}: Command_options)
    {
        this.trigger = trigger;
        this.output = output;
        this.developer = developer;
        this.limit_to = limit_to;
        this.usage = usage;
        this.bot_perms = bot_perms;
        this.user_perms = user_perms;
    }

    abstract run(message: Message, args: string[]): void;
}

export class Text_command extends Command
{
    constructor({trigger, output, developer = false, limit_to = [], usage = "", user_perms = [], bot_perms = []}: Command_options)
    {
        super({trigger, output, developer, limit_to, usage, user_perms, bot_perms});
    }

    public run(message: Message, args: string[] = []) : void 
    {
        const output = this.output({message, args})

        if (!output)
        {
            return show_usage(message, this)
        }

        new Embed({
            object: message,
            message: output
        }).send()
    }
}

export class Image_command extends Command
{
    constructor({trigger, output, developer = false, limit_to = [], usage = "", user_perms = [], bot_perms = []}: Command_options)
    {
        super({trigger, output, developer, limit_to, usage, user_perms, bot_perms});
    }

    public async run(message: Message, args: string[] = []) : Promise<void> 
    {
        const output = await this.output({message, args})
        
        if (!output)
        {
            return show_usage(message, this)
        }

        new Embed({
            object: message,
            message: output.text,
            image: output.image ? output.image : "",
            thumbnail: output.thumbnail ? output.thumbnail : ""
        }).send()
    }
}

function show_usage(message: Message, command: Command) : void
{
    new Embed({
        object: message,
        message: `**Valid Usage:**\n${core.prefix}${command.trigger} ${command.usage}`
    }).send()
}