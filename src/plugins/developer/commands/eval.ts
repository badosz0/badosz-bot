import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "eval",
    developer: true,
    output : ({message, args = []}: Command_output) => 
    {
        try 
        {
            const before = Date.now()
            const output = eval(args.slice(0).join(" "))
            const eval_time = Date.now() - before;
            return {
                text: `\`\`\`js\n${output}\`\`\`\n${eval_time}ms`
            }
        }
        catch (error)
        {
            return {
                text: `\`\`\`js\n${error}\`\`\``
            }
        }
    }
})