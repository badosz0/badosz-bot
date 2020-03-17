import { Command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Command ({
    trigger : "setavatar",
    developer: true,
    output : ({args = []}: Command_output) => 
    {
        try 
        {
            core.user.setAvatar(args.join(' '))
            return {
                text: "Avatar changed."
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