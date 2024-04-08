require("dotenv").config();
const { token } = process.env;

const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
} = require("discord.js");

const fs = require("fs");
const client = new Client({
	partials: [Partials.Channel, Partials.GuildMember, Partials.User],
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.commands = new Collection();
client.commandArray = [];
client.colour = "";

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

client.handleEvents();
client.handleCommands();
client.login(token);
