import { Text_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";
import { single } from "../../../utils/array";

export = new Text_command ({
    trigger : "choose",
    output : ({message, args = []}: Command_output) => 
    {
        let options = args.join(" ")
        
        if (!options.includes(","))
        {
            return 'Please include more options separated with ",".'
        }

        return single(options.split(","))
    }
})