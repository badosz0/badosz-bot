import { Bot } from "../index"
import fs from "fs"
import { log } from "../utils/logger"

export default function load_plugins(bot: Bot): void {
    const plugins = fs.readdirSync(`${__dirname}/../plugins`)
    
    for (const plugin_path of plugins) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const plugin = require(`../plugins/${plugin_path}`).data
        bot.plugins.push(plugin)
    }
      
    log("info", `Loaded ${bot.plugins.length} plugins.`)
}