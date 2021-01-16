import { Command } from "../../../structures/command"

export = new Command({
    trigger: "sourcecode",
    output: () => ({message: "https://github.com/badosz0/badosz-bot"})
})