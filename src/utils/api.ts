import fetch, { Response } from 'node-fetch'
const api = require("../../config/api.json")

export function get_api(endpoint: string, params?: any): Promise<Response>
{
    const add = [];
    for (const key in params) add.push(`${key}=${encodeURIComponent(params[key])}`)
    return fetch(`https://api.badosz.com/${endpoint}${add.length ? `?${add.join('&')}` : ''}`,
    {
        method: 'GET',
        headers: {
            Authorization: api.token
      }
    })
}