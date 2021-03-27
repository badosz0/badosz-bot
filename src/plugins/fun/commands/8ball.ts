import { single } from "../../../utils/array";
import { Command, CommandInput } from "../../../structures/command";

const outcomes = [
    "It's decidedly so",
    "Yes definitely",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
    "No",
];

export = new Command({
    trigger: "8ball",
    usage: "<question>",
    output: ({ args = [] }: CommandInput) => {
        if (!args) {
            return false;
        }

        return {
            message: `:8ball: ${single(outcomes) as string}`,
        };
    },
});
