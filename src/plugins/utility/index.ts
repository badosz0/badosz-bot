import fs from "fs";

const commands = fs
    .readdirSync(`${__dirname}/commands/`)
    .filter((file: string) => file !== "index.js")
    .map((file: string) => require(`${__dirname}/commands/${file}`));

export const data = {
    name: "Utility",
    id: "utility",
    commands: commands,
};
