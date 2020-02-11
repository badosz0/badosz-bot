const commands = require('fs')
				 .readdirSync(`${__dirname}/commands/`)
				 .filter((file: string) => file !== 'index.js')
				 .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: 'Burning Knight',
	id: 'bk',
	limit_to: ["440553300203667477"],
  	commands: commands,
}
