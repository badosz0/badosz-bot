import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "searchemoji",
    usage: "<emoji name>",
    output : ({message, args = []}: Command_output) => 
    {
        const name = args[0]
        
        if (!name)
        {
            return false
        }

        const emojis = core.emojis.filter(emoji => emoji.name.toLowerCase().includes(name.toLowerCase()))
        
        if (emojis.size == 0)
        {
            return "Didn't find any emoji with that name."
        }

        let list = `Found [\`${emojis.size}\`](https://badosz.com/emoji-finder?emoji=${name}) emoji${emojis.size > 1 ? "s" : ""}\n\n`
        
        emojis.forEach(emoji => {
            if (list.length > 1800) return
            list += `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}> ` +
                    `[${emoji.name}](https://cdn.discordapp.com/emojis/${emoji.id}${emoji.animated ? ".gif?v=1" : ".png"})` +
                    `\n`
           
        })
        
        return {
            text: list
        }
    }
})