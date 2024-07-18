require("dotenv").config();
const { token } = process.env;

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Player, GuildQueue, GuildNodeManager } = require("discord-player");

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


// MongoDB Setup
const { MongoClient, ServerApiVersion } = require("mongodb");
const { MONGO_URI } = process.env;

const mongoClient = new MongoClient(MONGO_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

async function run() {
	try {
		await mongoClient.connect();
		await mongoClient.db("admin").command({ ping: 1 });
		console.log("Connected successfully to server");
	} finally {
		await mongoClient.close();
	}
}

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
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
});

client.queueManager = new GuildNodeManager(client.player);

client.player.extractors.loadDefault();

run().catch(console.dir);
client.handleEvents();
client.handleCommands();
client.login(token);
