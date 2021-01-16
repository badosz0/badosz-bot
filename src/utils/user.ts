import { Message, User} from "discord.js"

export async function get_user (message: Message, args: string[], me = true): Promise<User|boolean> {
    let user
    
    if (me) {
        user = message.author 
    } else {
        user = false
    }
    
    if (message.mentions.users.size) {  
        user = message.mentions.users.first() || user
    } 
    else if (args[0] && message.client.users.cache.get(args[0])) {   
        user = message.client.users.cache.get(args[0]) || user
    }
    
    return user
}