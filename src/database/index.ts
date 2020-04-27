const commands = require('fs')
				 .readdirSync(__dirname)
				 .filter((file: string) => file !== 'index.js')
				 .map((file: string) => {
                    const name = file.split('.')[0]
                    exports[name] = require(`${__dirname}/${file}`)
                 })