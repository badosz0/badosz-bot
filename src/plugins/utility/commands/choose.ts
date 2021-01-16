import { colors } from "../../../constants"
import { Command, CommandInput } from "../../../structures/command"
import { single } from "../../../utils/array"

export = new Command ({
    trigger : "choose",
    usage: "<option>, <option>, [option]...",
    output: ({args = []}: CommandInput) => {
        const options = args.join(" ")
        
        if (!options.includes(",")) {
            return {
                message: "**Please include more options separated with \",\".**",
                color: colors.error
            }
        }

        return {
            message: single(options.split(",")) as string
        }
    }
})