import fetch, { Response } from "node-fetch"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {api} = require("../../config/tokens.json")

export async function get_api(endpoint: string, params: {[event_name: string]: string} = {}): Promise<Response>
{
    const add = []
    for (const key in params) add.push(`${key}=${encodeURIComponent(params[key])}`)
    return fetch(`https://api.badosz.com/${endpoint}${add.length ? `?${add.join("&")}` : ""}`, {
        method: "GET",
        headers: {
            Authorization: api
        }
    })
}