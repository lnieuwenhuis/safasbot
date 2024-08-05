import { REST, Routes } from "discord.js";
import fs from "fs";
import { config } from "../../config";

module.exports = (client: any) => {
	client.handleCommands = async () => {
		const commandFolders = fs.readdirSync("./src/commands");
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./src/commands/${folder}`)
				.filter((file) => file.endsWith(".js"));

			const { commands, commandArray } = client;

			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
				console.log(
					`Command: ${command.data.name} has been passed through the handler.`
				);
			}
		}

		const clientId = config.DISCORD_CLIENT_ID;
		const rest = new REST({ version: "10" }).setToken(config.beta_token);
		try {
			console.log("Started refreshing application (/) commands.");

			await rest.put(Routes.applicationCommands(clientId), {
				body: client.commandArray,
			});
		} catch (error) {
			console.error(error);
		}
	};
};