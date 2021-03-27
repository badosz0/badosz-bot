import { Command } from "../../../structures/command";

export = new Command({
    trigger: "dice",
    output: () => {
        return {
            message: (Math.floor(Math.random() * 6 + 1) as unknown) as string,
            thumbnail: "https://i.imgur.com/7e4iOYA.gif",
        };
    },
});
