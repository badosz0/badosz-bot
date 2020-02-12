import { Client } from "discord.js";
import { Json_settings } from "./types";
import Events_handler from "./handlers/events";
import Plugin_handler from "./handlers/plugins";

const prefixes = require("../config/prefixes.json");
const tokens = require("../config/tokens.json");
const roles = require("../config/roles.json");
const ports = require("../config/ports.json");

export class Bot extends Client 
{
    private handlers: {
        events : Events_handler;
        plugins : Plugin_handler;
    };
    
    public prefix: string;
    public api_port: number;
    public plugins: any[] = [];
    public developer: string;
    
    constructor (settings: Json_settings)
    {
        super(settings);

        this.handlers = {
            events : new Events_handler (this),
            plugins : new Plugin_handler (this)
        };

        this.prefix = settings.prefix;
        this.developer = settings.developer;
        this.api_port = settings.api_port;
        
        this.login(settings.token);

        require("./handlers/api").init(this)
    }
}

export const core = new Bot (
    {
        prefix : (process.argv[2] == "beta" ? prefixes.beta : prefixes.main),
        developer : roles.developer,
        token : tokens.discord,
        api_port : ports.api,
        disabledEvents: [
          'TYPING_START',
        ]
    }
)
