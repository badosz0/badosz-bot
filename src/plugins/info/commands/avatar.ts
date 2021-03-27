import { User } from "discord.js";
import { Command, CommandInput } from "../../../structures/command";
import { get_user } from "../../../utils/user";

export = new Command({
    trigger: "avatar",
    usage: "[mention/id]",
    output: async ({ message, args = [] }: CommandInput) => {
        const user = (await get_user(message, args)) as User;
        const source = user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });
        const png = source.replace(".gif", ".png");
        const webp = png.replace(".png", ".webp");
        const jpg = png.replace(".png", ".jpg");
        return {
            message: `**${user.tag}** (${user.id})\n[source](${source}) | [png](${png}) | [webp](${webp}) | [jpg](${jpg})`,
            image: source,
        };
    },
});
