import { core } from "../index";

export function run () : void
{
    console.log("Badosz Bot is ready.");
    (function setPresence() {
        core.user.setPresence(
          { game:
            { type: 'WATCHING',
               name: `${core.prefix}help`
            },
            status: 'online'
          }
        )
        setTimeout(setPresence, 120000)
      })()
}