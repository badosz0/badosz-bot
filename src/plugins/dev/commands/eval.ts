import { Command, CommandInput } from "../../../structures/command";

export = new Command({
    trigger: "eval",
    developer: true,
    output: ({ args }: CommandInput) => {
        const output = eval((args as string[]).join(" "));
        return {
            message: `\`\`\`\n${output}\n\`\`\``,
        };
    },
});
