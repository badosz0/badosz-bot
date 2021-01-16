import { single } from "../../../utils/array"
import { Command } from "../../../structures/command"

export = new Command({
    trigger: "coinflip",
    output: () => {
        return {
            message: single(["Tails", "Heads"]) as string,
            thumbnail: "https://i.imgur.com/6qJ4yaX.gif"
        }
    }
})