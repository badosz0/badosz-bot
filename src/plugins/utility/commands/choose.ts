import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";
import { single } from "../../../utils/array";

export = new Command ({
    trigger : "choose",
    usage: "<option>, <option>, [option]...",
    output : ({message, args = []}: Command_output) => 
    {
        let options = args.join(" ")
        
        if (!options.includes(","))
        {
            return 'Please include more options separated with ",".'
        }

        return {
            text: single(options.split(","))
        }
    }
})