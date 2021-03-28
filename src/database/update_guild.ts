import { connection } from ".";
import rethinkdb from "rethinkdb";
import { cache } from "./get_guild";

export default async function (data: any): Promise<any | null> {
    delete cache[data.id];

    const user = await rethinkdb
        .table("guilds")
        .replace(data)
        .run(connection as rethinkdb.Connection);

    return user;
}
