import { Message, PermissionString } from "discord.js"
import { Embed, EmbedOptions } from "./embed"
import { core } from "../index"

export interface CommandData {
    trigger: string
    usage?: string
    developer?: boolean
    user_perms?: PermissionString[]
    bot_perms?: PermissionString[]
    output: ({message}: CommandInput) => EmbedOptions | Promise<EmbedOptions | boolean>| boolean
}

export interface CommandInput {
    message: Message
    args?: string[]
}

export class Command {
    public data: CommandData

    constructor(data: CommandData) {
        this.data = data
    }

    public async run(message: Message, args: string[] = []): Promise<void> {
        const output = await this.data.output({message, args})
        if (!output) {
            return this.show_usage(message)
        }

        if (output === true) {
            return
        }

        new Embed(message, output).send()
    }

    public show_usage(message: Message): void {
        new Embed(message, {
            message: `**Valid Usage:**\n${core.prefix}${this.data.trigger} ${this.data.usage}`,
            color: "#f44262"
        }).send()
    }
    
}