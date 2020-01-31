import { ClientOptions } from "discord.js";


export interface Json_settings extends ClientOptions
{
    token : string;
    prefix : string;
}