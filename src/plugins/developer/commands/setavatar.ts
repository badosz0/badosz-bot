import { Text_command, Command_output } from "../../../structures/command";
import { core } from "../../../index";

export = new Text_command ({
    trigger : "setavatar",
    developer: true,
    output : ({message, args = []}: Command_output) => 
    {
        try 
        {
            core.user.setAvatar(args.join(' '))
            return "Avatar changed."
        }
        catch (error)
        {
            return `\`\`\`js\n${error}\`\`\``
        }
    }
})