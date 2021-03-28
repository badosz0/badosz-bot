import { connection } from ".";
import rethinkdb from "rethinkdb";

export let cache: { [type: string]: any } = {};

export default async function (id: string): Promise<any | null> {
    if (cache[id]) {
        if (Date.now() - cache[id].time < 30_000) {
            return cache[id].guild;
        }
    }

    let guild = await rethinkdb
        .table("guilds")
        .get(id)
        .run(connection as rethinkdb.Connection);

    if (guild) {
        cache[id] = {
            guild,
            time: Date.now(),
        };
    } else {
        guild = await rethinkdb
            .table("guilds")
            .insert({
                id,
                starboard: {
                    reactions: 2,
                    channel: ``,
                    emoji: `⭐`,
                    enabled: false,
                },
            })
            .run(connection as rethinkdb.Connection);
    }

    return guild;
}
