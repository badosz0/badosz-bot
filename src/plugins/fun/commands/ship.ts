import { Command, CommandInput } from "../../../structures/command";

export = new Command({
    trigger: "ship",
    usage: "<mention> <mention> ..",
    output: async ({ message }: CommandInput) => {
        if (message.mentions.users.size <= 1) {
            return false;
        }

        const users = message.mentions.users.map((u) => u.username);
        let name = "";

        for (let i = 0; i < users.length; i++) {
            name += `${users[i].substring(0, users[i].length / 2)}`;
        }

        return {
            message: `${users.join(" + ")} = \`${name}\``,
        };
    },
});
