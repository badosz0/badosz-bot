import { Message, User } from "discord.js";

export async function get_user (message: Message, args: string[], me: boolean = true) : Promise<any>
{
    let user
    
    if (me)
    {
        user = message.author 
    }
    else
    {
        user = false
    }
    
    if (message.mentions.users.size)
    {  
        user = message.mentions.users.first()
    } 
    else if (args[0] && message.client.users.get(args[0]))
    {   
        user = message.client.users.get(args[0]) || user
    }
    
    return user
}