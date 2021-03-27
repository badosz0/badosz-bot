import { Command, CommandInput } from "../../../structures/command";

export = new Command({
    trigger: "role",
    developer: false,
    usage: "<mention/id/name>",
    output: async ({ message, args = [] }: CommandInput) => {
        let role = message.mentions.roles.first();
        if (!role) role = message.guild?.roles.cache.find((role) => role.name === args.join(" "));
        if (!role) role = message.guild?.roles.cache.find((role) => role.id === args.join(" "));
        if (!role) {
            return false;
        }

        return {
            fields: [
                {
                    title: "Name",
                    text: role.name,
                    inline: true,
                },
                {
                    title: "Members",
                    text: (role.members.size as unknown) as string,
                    inline: true,
                },
                {
                    title: "ID",
                    text: role.id,
                    inline: true,
                },
                {
                    title: "Position",
                    text: (role.position as unknown) as string,
                    inline: true,
                },
                {
                    title: "Hoisted",
                    text: role.hoist ? "Yes" : "No",
                    inline: true,
                },
                {
                    title: "Mentionable",
                    text: role.mentionable ? "Yes" : "No",
                    inline: true,
                },
                {
                    title: "Created At",
                    text: role.createdAt.toUTCString(),
                },
            ],
            thumbnail: `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`,
        };
    },
});
