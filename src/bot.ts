require("dotenv").config();
const { token } = process.env;

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Player, GuildQueue, GuildNodeManager } = require("discord-player");

// MongoDB Setup
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const path = require("node:path");

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences,
	],
});

client.commands = new Collection();
client.commandArray = [];
client.colour = "";

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file:any) => file.endsWith(".js"));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
});
client.queueManager = new GuildNodeManager(client.player);
client.player.extractors.loadDefault();

(async () => {
	try{
		mongoose.set('strictQuery', false);
		await mongoose.connect(MONGO_URI);
		console.log("Connected to MongoDB");
		
		// Load events and commands
		client.handleEvents();
		client.handleCommands();
		client.login(token);
	} catch (err) {
		console.log(err);
	} 
})();

