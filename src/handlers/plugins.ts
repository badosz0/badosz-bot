import { Bot } from "../index"
import fs from "fs"

export default function load_plugins(bot: Bot): void {
    const plugins = fs.readdirSync(`${__dirname}/../plugins`)
    
    for (const plugin_path of plugins) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const plugin = require(`../plugins/${plugin_path}`).data
        bot.plugins.push(plugin)
    }
      
    console.log(`Loaded ${bot.plugins.length} plugins.`)
}