import { ClientOptions } from "discord.js";


export interface Json_settings extends ClientOptions
{
    developer: string;
    token : string;
    prefix : string;
    api_port: number;
    database: any
}