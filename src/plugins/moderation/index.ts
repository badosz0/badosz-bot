const commands = require('fs')
				 .readdirSync(`${__dirname}/commands/`)
				 .filter((file: string) => file !== 'index.js')
				 .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: 'Moderation',
	id: 'moderation',
  	commands: commands,
}