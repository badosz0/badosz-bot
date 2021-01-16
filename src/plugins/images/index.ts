import { Command } from "../../structures/command"
import { get_api } from "../../utils/api"

const commands: Command[] = []
const images = [
    "ant", 
    "bird",
    "bee",
    "rabbit",
    "catgirl",
    "cuddle",
    "dog",
    "feed",
    "fox",
    "hug",
    "jesus",
    "kiss",
    "pat",
    "poke",
    "shibe",
    "snake",
    "pig",
    "koala",
    "gecko",
    "tickle",
]

for (const image of images) {
    commands.push(
        new Command ({
            trigger : image,
            output : async () => {
                return {
                    attachment: await (await get_api(image)).buffer(),
                    footer: "api.badosz.com"
                }
            }
        })
    )
}


export const data = {
    name: "Images",
    id: "images",
    commands: commands,
}