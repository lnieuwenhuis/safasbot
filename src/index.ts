import { Client, Collection, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import mongoose from "mongoose";
import fs from "fs";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
});

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file: any) => file.endsWith(".ts"));
    for (const file of functionFiles) {
        import(`./functions/${folder}/${file}`);
    }
}

(async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(config.MONGO_URI!);
        console.log("Connected to MongoDB");

        client.handleEvents();
        client.handleCommands();
        client.login(config.beta_token);
    } catch (error) {
        console.error(error);
    }
})