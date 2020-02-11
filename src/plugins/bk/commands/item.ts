import { Image_command, Command_output } from "../../../structures/command";
import { get_user } from "../../../utils/user";

const fetch = require('node-fetch')

const types = [
    "Artifact",
    "Active",
    "Coin",
    "Bomb",
    "Key",
    "Heart",
    "Consumable Artifact",
    "Weapon",
    "Battery",
    "Hat",
    "Pouch",
    "Scourge"
]

export = new Image_command ({
    trigger : "item",
    developer: false,
    limit_to: ["440553300203667477"],
    output : async ({message, args = []}: Command_output) => 
    {
        let items = await fetch(`https://raw.githubusercontent.com/egordorichev/BurningWiki/master/data/items/items.json`, {method: "Get"}).then((res: any)=> res.json())
        let strings = await fetch(`https://raw.githubusercontent.com/egordorichev/BurningWiki/master/data/en.json`, {method: "Get"}).then((res: any)=> res.json())
        
        const item = items["bk:" + args[0]]
        
        if (!item)
        {
            return {text: "Provide a valid item."}
        }

        let item_data = 
        `**[${strings[item.id]}](https://egordorichev.github.io/BurningWiki/src/index.html?item=${item.id})**\n` +
        `\`ID:\` ${item.id}\n` +
        `\`Type:\` ${types[item.type ? item.type : 0]}\n` +
        `\`Usage:\` Every ${item.time ? item.time : 0}s\n`

        item.uses.forEach((use: { id: string; damage: number; time: number; speed: number; accuracy: number; range: number}) => {
            if (use.id == "bk:MeleeArc")
            {
                item_data += "\n**Melee Damage**\n" + 
                             `\`Damage:\` ${use.damage ? use.damage : 0}\n` +
                             `\`Attack:\` Every ${use.time ? use.time : 0}s\n`
            }
            if (use.id == "bk:SimpleShoot")
            {
                item_data += "\n**Range Damage**\n" +
                             `\`Damage:\` ${use.damage ? use.damage : 0}\n` +
                             `\`Speed:\` ${use.speed ? use.speed : 0}\n` +
                             `\`Accuracy:\` ${use.accuracy ? use.accuracy : 0}\n` +
                             `\`Range:\` ${use.range ? use.range : 0}\n`

            }
        })

        return {
            text: item_data,
            thumbnail: `https://github.com/egordorichev/BurningWiki/blob/master/data/images/${item.id}.png?raw=true`
        }
    }
})