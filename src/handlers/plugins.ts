import { Bot } from "../index";
const fs = require("fs");

export default class Plugin_handler 
{
    constructor (bot: Bot)
    {
        bot.plugins = [];
          
        const plugins = fs.readdirSync(`${__dirname}/../plugins`);

        for (const plugin_path of plugins) 
        {
            const plugin = require(`../plugins/${plugin_path}`).data;
            bot.plugins.push(plugin);
        }
          
        console.log(`Loaded ${bot.plugins.length} plugins.`);
    }
} 
