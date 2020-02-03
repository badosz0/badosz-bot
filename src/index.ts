import { Client } from "discord.js";
import { Json_settings } from "./types";
import Events_handler from "./handlers/events";
import Plugin_handler from "./handlers/plugins";

const prefixes = require("../config/prefixes.json");
const tokens = require("../config/tokens.json");

export class Bot extends Client 
{
    private handlers: {
        events : Events_handler;
        plugins : Plugin_handler;
    };
    
    public prefix: string;
    public plugins: any[] = [];
    
    constructor (settings: Json_settings)
    {
        super(settings);

        this.handlers = {
            events : new Events_handler (this),
            plugins : new Plugin_handler (this)
        };

        this.prefix = settings.prefix;
        
        this.login(settings.token);
    }
}

export const core = new Bot (
    {
        prefix : prefixes.main,
        token : tokens.discord,
        disabledEvents: [
          'TYPING_START',
        ]
    }
)
