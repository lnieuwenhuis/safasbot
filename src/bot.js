require("dotenv").config();
const { token } = process.env;

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Player, GuildQueue } = require("discord-player");

const path = require("node:path");

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const client = new Client({
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

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestAudio",
		highWaterMark: 1 << 25,
	},
});
client.musicQueue = new GuildQueue(client.player, {
	guild: interaction.member.guild,
});

client.handleEvents();
client.handleCommands();
client.login(token);
