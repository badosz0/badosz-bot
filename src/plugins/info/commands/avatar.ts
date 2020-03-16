import { Image_command, Command_output } from "../../../structures/command";
import { get_user } from "../../../utils/user";

export = new Image_command ({
    trigger : "avatar",
    developer: false,
    usage: "[mention/id]",
    output : async ({message, args = []}: Command_output) => 
    {
        const user = await get_user(message, args)
        const source = user.displayAvatarURL
        const png = source.replace('.gif', '.png')
        const webp = png.replace('.png', '.webp')
        const jpg = png.replace('.png', '.jpg')
        return {
            text: `${user.tag} (${user.id})\n[source](${source}) | [png](${png}) | [webp](${webp}) | [jpg](${jpg})`,
            image: source
        }
    }
})