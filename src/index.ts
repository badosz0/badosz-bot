/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, ClientOptions, Message } from "discord.js";
import { Command } from "./structures/command";
import { assign_events } from "./handlers/events";
import load_plugins from "./handlers/plugins";
import { connect } from "./database";

const prefixes = require("../config/prefixes.json");
const tokens = require("../config/tokens.json");
const database = require("../config/database.json");

export interface Settings extends ClientOptions {
    prefix: string;
    token: string;
    database: {
        host: string;
        port: number;
        user: string;
        password?: string;
        db: string;
    };
}

export interface Plugin {
    name: string;
    id: string;
    commands: Command[];
}

export interface CacheData {
    snipe: {
        message?: Message;
        img?: string;
        time?: number;
    };
}

export type Cache = { [id: string]: CacheData };

export class Bot extends Client {
    public prefix: string;
    public plugins: Plugin[];
    public cache: Cache;

    constructor(settings: Settings) {
        super(settings);

        this.prefix = settings.prefix;
        this.plugins = [];
        this.cache = {};

        assign_events(this);
        load_plugins(this);
        connect(settings);

        this.login(settings.token);
    }
}

const beta = process.argv[2] == "beta";

export const core = new Bot({
    prefix: beta ? prefixes.beta : prefixes.main,
    token: beta ? tokens.discord_beta : tokens.discord_main,
    database: beta ? database.beta : database.main,
});
